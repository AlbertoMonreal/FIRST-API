"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const pg_1 = require("pg");
const typedi_1 = require("typedi");
const db_transaction_1 = require("./models/db-transaction");
let DatabaseService = class DatabaseService {
    constructor() {
        this.dbPool = null;
    }
    /**
     * Función que conecta con la base de datos e inicializa el pool de conexiones
     */
    initConnectionPool(dbOptions) {
        process.env.TZ = 'UTC';
        this.dbPool = this.createPostgreSQLInstance(dbOptions);
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.dbPool) {
                yield this.dbPool.end();
            }
        });
    }
    /**
     * Esta función tiene el objetivo de ejecutar una determinada consulta SQL y
     * devolver los resultados de la ejecución.
     */
    execQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbClient = yield this.getConnection();
            const { sql, params } = query;
            try {
                const _a = yield dbClient.query({
                    text: sql,
                    values: params,
                }), { rows, rowCount } = _a, result = __rest(_a, ["rows", "rowCount"]);
                return { rows, rowCount, result };
            }
            finally {
                dbClient.release();
            }
        });
    }
    /**
     * Esta función tiene el objetivo de crear una nueva conexión con el pool e
     * inicializar la transacción, no cerramos la conexión del pool ya que esta
     * tiene que estar activa hasta que se haga el COMMIT o el ROLLBACK
     * correspondiente.
     */
    startTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            const dbClient = yield this.getConnection();
            return new db_transaction_1.DBTransaction(dbClient);
        });
    }
    /**
     * Si hay una instancia creada la devolvemos, sino creamos un nuevo pool de
     * conexiones.
     */
    createPostgreSQLInstance(dbOptions) {
        if (this.dbPool != null) {
            return this.dbPool;
        }
        return new pg_1.Pool({
            user: dbOptions.user,
            host: dbOptions.host,
            database: dbOptions.database,
            password: dbOptions.password,
            port: dbOptions.port,
        });
    }
    /**
     * Esta función permite devolver el cliente resultante de conectarse al pool.
     */
    getConnection() {
        if (this.dbPool) {
            return this.dbPool.connect();
        }
        else {
            throw new Error('No connection could be established');
        }
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], DatabaseService);
