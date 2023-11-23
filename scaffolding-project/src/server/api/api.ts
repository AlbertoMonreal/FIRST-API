import { Router } from 'express';
import { Service } from 'typedi';

import { SampleController } from '../../app/sample/sample.controller';

@Service()
export class Api {
  private apiRouter: Router;

  constructor(private readonly sampleControler: SampleController) {
    this.apiRouter = Router();
    this.apiRouter.use('/samples', this.sampleControler.router());
  }

  public getApiRouter(): Router {
    return this.apiRouter;
  }
}
