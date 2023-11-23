"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBTransaction = void 0;
class DBTransaction {
    constructor(dbClient) {
        this.dbClient = dbClient;
        // Esta varaible comprueba que el dbClient no ha sido cerrado.
        this.hasConnection = true;
        this.startTransaction();
    }
    /**
     * Función que finaliza la transacción guardando los cambios realizados.
     */
    commit() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.dbClient.query('COMMIT');
            }
            finally {
                this.hasConnection = false;
                this.dbClient.release();
            }
        });
    }
    /**
     * Función que finaliza la transacción descartando los cambios realizados.
     */
    rollback() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.dbClient.query('ROLLBACK');
            }
            finally {
                this.hasConnection = false;
                this.dbClient.release();
            }
        });
    }
    /**
     * Ejecuta una consulta dentro del contexto de la transacción. No se podrán
     * realizar consultas una vez se haya cerrado la transacción, es decir, no se
     * podrán realizar consultas con esta función una vez se haya ejecutado un
     * commit o un rollback o si ha fallado una consulta precedente.
     */
    addQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.hasConnection !== true) {
                return Promise.reject(new Error('TransactionError: The transaction has already been completed.'));
            }
            const { sql, params } = query;
            const { rows, rowCount } = yield this.dbClient.query({
                text: sql,
                values: params,
            });
            return { rows, rowCount };
        });
    }
    /**
     * Esta función inicializa la transacción. Es una función privada ya que se
     * ejecuta solo una vez en el constructor de la clase.
     */
    startTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dbClient.query('BEGIN');
        });
    }
}
exports.DBTransaction = DBTransaction;
