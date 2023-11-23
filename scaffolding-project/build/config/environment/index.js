"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const all = {
    env: 'development',
    port: process.env.PORT ? Number(process.env.PORT) : 8080,
    ip: '0.0.0.0',
    postgres: {
        user: 'postgres',
        host: '127.0.0.1',
        database: 'at_scaffolding',
        password: '2182775',
        port: 5432,
    },
    SECRET_JWT: 'secret.to.sign.the.token'
};
exports.config = all;
