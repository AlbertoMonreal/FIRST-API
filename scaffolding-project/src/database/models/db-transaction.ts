import { PoolClient } from 'pg';

import { DBQuery } from './db-query';
import { DBQueryResult } from './db-query-result';

export class DBTransaction {
  // Esta varaible comprueba que el dbClient no ha sido cerrado.
  private hasConnection = true;

  constructor(private dbClient: PoolClient) {
    this.startTransaction();
  }

  /**
   * Función que finaliza la transacción guardando los cambios realizados.
   */
  async commit(): Promise<Pick<DBQueryResult, 'rowCount' & 'rows'>> {
    try {
      return await this.dbClient.query('COMMIT');
    } finally {
      this.hasConnection = false;
      this.dbClient.release();
    }
  }

  /**
   * Función que finaliza la transacción descartando los cambios realizados.
   */
  async rollback(): Promise<Pick<DBQueryResult, 'rowCount' | 'rows'>> {
    try {
      return await this.dbClient.query('ROLLBACK');
    } finally {
      this.hasConnection = false;
      this.dbClient.release();
    }
  }

  /**
   * Ejecuta una consulta dentro del contexto de la transacción. No se podrán
   * realizar consultas una vez se haya cerrado la transacción, es decir, no se
   * podrán realizar consultas con esta función una vez se haya ejecutado un
   * commit o un rollback o si ha fallado una consulta precedente.
   */
  async addQuery(query: DBQuery): Promise<Pick<DBQueryResult, 'rowCount' | 'rows'>> {
    if (this.hasConnection !== true) {
      return Promise.reject(new Error('TransactionError: The transaction has already been completed.'));
    }

    const { sql, params } = query;

    const { rows, rowCount } = await this.dbClient.query({
      text: sql,
      values: params,
    });

    return { rows, rowCount };
  }

  /**
   * Esta función inicializa la transacción. Es una función privada ya que se
   * ejecuta solo una vez en el constructor de la clase.
   */
  private async startTransaction(): Promise<Pick<DBQueryResult, 'rowCount' & 'rows'>> {
    return await this.dbClient.query('BEGIN');
  }
}
