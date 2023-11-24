import { Router } from 'express';
import { Service } from 'typedi';

import { SampleController } from '../../app/sample/sample.controller';
import { UserController } from '../../app/user/user.controller';

@Service()
export class Api {
  private apiRouter: Router;

  constructor(private readonly controller: SampleController | UserController) {
    this.apiRouter = Router();

    if (this.controller instanceof SampleController) {
      this.apiRouter.use('/samples', this.controller.router());
    } else if (this.controller instanceof UserController) {
      this.apiRouter.use('/users', this.controller.router());
    }
  }

  public getApiRouter(): Router {
    return this.apiRouter;
  }
}