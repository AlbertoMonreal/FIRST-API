import 'reflect-metadata';

import { Container } from 'typedi';

import { config } from './config/environment';
import { Server } from './server/server';
import { Api } from './server/api/api';
import { DatabaseService } from './database/database';

init();

function init(): void {
  const containterDB = Container.get(DatabaseService);

  try {
    containterDB.initConnectionPool(config.postgres);
    Container.get(Server);
    Container.get(Api);
  } catch (err) {
    console.error('Init error: ', err);
    process.exit(-1);
  }
}
