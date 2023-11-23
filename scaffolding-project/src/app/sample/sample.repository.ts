
import { Service } from 'typedi';

import { Sample } from './sample.model';
import { DatabaseService } from '../../database/database';

@Service()
export class SampleRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findById(sampleId: number): Promise<Sample> {
    const queryDoc: any = {
      sql: 'SELECT * FROM samples WHERE id = $1',
      params: [sampleId],
    };

    const samples = await this.databaseService.execQuery(queryDoc);
    return samples.rows[0];
  }

  async findAll(): Promise<Sample[]> {
    const queryDoc: any = {
      sql: 'SELECT * FROM samples',
    };

    const samples = await this.databaseService.execQuery(queryDoc);
    return samples.rows;
  }

  async create(sample: Sample): Promise<Sample> {
    const queryDoc: any = {
      sql: 'INSERT INTO samples (type) VALUES ($1) RETURNING *',
      params: [sample.type],
    };

    const samples = await this.databaseService.execQuery(queryDoc);
    return samples.rows[0];
  }
  //Y aqui, explico como borrar.
  async delete(sampleId: number): Promise<Sample> {
    const queryDoc: any = {
      //$1 hace referencia al primer parametro de params.
      //RETURNNING * DEVUELVE EL ELEMENTO.
      sql: 'DELETE FROM samples WHERE id= $1 RETURNING *',
      params: [sampleId],
    };
    const samples = await this.databaseService.execQuery(queryDoc);
    return samples.rows[0];
  }

  //Y aqui, explico como actualizar.
  async update(sampleId: number, newType: string): Promise<Sample> {
    const queryDoc: any = {
      sql: 'UPDATE samples SET type = $2 WHERE id = $1 RETURNING *',
      params: [sampleId, newType], // Asigna sampleId al primer parámetro ($1) y newType al segundo parámetro ($2)
    };
    const samples = await this.databaseService.execQuery(queryDoc);
    return samples.rows[0];
  }
}
