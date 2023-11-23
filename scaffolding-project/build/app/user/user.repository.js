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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const typedi_1 = require("typedi");
const database_1 = require("../../database/database");
let UserRepository = class UserRepository {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryDoc = {
                sql: 'SELECT * FROM users WHERE id = $1',
                params: [userId],
            };
            const users = yield this.databaseService.execQuery(queryDoc);
            return users.rows[0];
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const queryDoc = {
                sql: 'SELECT * FROM users',
            };
            const users = yield this.databaseService.execQuery(queryDoc);
            return users.rows;
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryDoc = {
                sql: 'INSERT INTO users (username) VALUES ($1) RETURNING *',
                params: [user.username],
            };
            const users = yield this.databaseService.execQuery(queryDoc);
            return users.rows[0];
        });
    }
    //Y aqui, explico como borrar.
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryDoc = {
                //$1 hace referencia al primer parametro de params.
                //RETURNNING * DEVUELVE EL ELEMENTO.
                //sql: 'DELETE FROM users WHERE id= $1 AND is_active = true RETURNING *',
                sql: 'UPDATE users SET is_active = false WHERE id = $1 AND is_active = true RETURNING *',
                params: [userId],
            };
            const users = yield this.databaseService.execQuery(queryDoc);
            return users.rows[0];
        });
    }
    //Y aqui, explico como actualizar.
    update(userId, username, isActive) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryDoc = {
                sql: 'UPDATE users SET username = $2, is_active = $3 WHERE id = $1 RETURNING *',
                params: [userId, username, isActive], // Asigna userId al primer parámetro ($1), username al segundo parámetro ($2) y interruptor parametro ($3)
            };
            const users = yield this.databaseService.execQuery(queryDoc);
            return users.rows[0];
        });
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [database_1.DatabaseService])
], UserRepository);
