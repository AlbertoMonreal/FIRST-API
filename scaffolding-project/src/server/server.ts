import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import { Application } from 'express';
import express from 'express';
import * as http from 'http';
import { Service } from 'typedi';

import { config } from '../config/environment';
import { Api } from './api/api';
import { apiError } from './middlewares/apiError';

@Service()
export class Server {
  app: Application;
  httpServer: http.Server;

  constructor(private readonly api: Api) {
    this.app = express();
    this.setupServer();

    this.httpServer = this.app
      .listen(config.port, () => {
        this.onHttpServerListening();
      })
      .on('error', (error) => {
        console.log('Error starting up server:', error);
      });
  }

  private async setupServer() {
    this.app.use(cors());
    this.app.use(json({ limit: '5mb' }));
    this.app.use(urlencoded({ extended: false }));
    this.app.use('/api', this.api.getApiRouter());

    this.app._router.use(apiError);

  }

  private onHttpServerListening(): void {
    console.log('Server Express iniciado en modo %s (ip: %s, puerto: %s)', config.env, config.ip, config.port);
  }
}
