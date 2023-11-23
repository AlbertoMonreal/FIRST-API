"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typedi_1 = require("typedi");
const environment_1 = require("./config/environment");
const server_1 = require("./server/server");
const api_1 = require("./server/api/api");
const database_1 = require("./database/database");
init();
function init() {
    const containterDB = typedi_1.Container.get(database_1.DatabaseService);
    try {
        containterDB.initConnectionPool(environment_1.config.postgres);
        typedi_1.Container.get(server_1.Server);
        typedi_1.Container.get(api_1.Api);
    }
    catch (err) {
        console.error('Init error: ', err);
        process.exit(-1);
    }
}
