//comentario para git
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Service } from 'typedi';

import { ErrorService } from '../../error/error';
import { SampleService } from './sample.service';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export class SampleController {
  constructor(
    private readonly sampleService: SampleService,
    private readonly errorService: ErrorService,
  ) {}

  router(): Router {
    const router = Router();

    router.get('/:sampleId', (req, res, next) => this.get(req, res, next));

    router.get('/', (req, res, next) => this.getAll(req, res, next));

    router.post('/', (req, res, next) => this.create(req, res, next));

    router.put('/:sampleId', (req, res, next) => this.update(req, res, next));
    
    router.delete('/:sampleId', (req, res, next) => this.delete(req, res, next));

    return router;
  }

  async get(req: any, res: any, next: any): Promise<void> {
    // 1. Si no llega sampleId en la petición  devolvemos FORBIDDEN
    if (req.params.sampleId == null && req.query.name == null) {
      return next(this.errorService.sendError(res, StatusCodes.FORBIDDEN));
    }

    try {
      // 2. Buscamos los samples que coinciden con el filtro de búsqueda.
      const sampleCode = parseInt(req.params.sampleId);
      const sample = await this.sampleService.findById(sampleCode);

      // 3. Devolvemos los samples.
      res.send(sample);
    } catch (err) {
      console.log(err);
      // 4. Si hay algún error en la operación de búsqueda devolvemos un error NOT_FOUND.
      res.sendStatus(StatusCodes.NOT_FOUND);
    }
  }

  async getAll(req: any, res: any, next: any): Promise<void> {
    try {
      const samples = await this.sampleService.findAll();
      res.send(samples);
    } catch (err) {
      console.log(err);
      res.sendStatus(StatusCodes.NOT_FOUND);
    }
  }

  async create(req: any, res: any, next: any): Promise<void> {
    try {
      const sample = await this.sampleService.create(req.body);
      res.send(sample);
    } catch (err) {
      console.log(err);
      res.sendStatus(StatusCodes.BAD_REQUEST);
    }
  }

  async update(req: any, res: any, next: any): Promise<void> {
    // 1. Si no llega sampleId en la petición  devolvemos FORBIDDEN
    if (req.params.sampleId == null && req.query.name == null) {
      return next(this.errorService.sendError(res, StatusCodes.FORBIDDEN));
    }
    if (req.body.type == undefined) {
      return next(this.errorService.sendError(res, StatusCodes.FORBIDDEN));
    }

    try {
      // 2. Buscamos los samples que coinciden con el filtro de búsqueda.
      const sampleCode = parseInt(req.params.sampleId);
      const sampleType = req.body.type;
      const sample = await this.sampleService.update(sampleCode,sampleType);

      // 3. Devolvemos los samples.
      res.send(sample);
    } catch (err) {
      console.log(err);
      // 4. Si hay algún error en la operación de búsqueda devolvemos un error NOT_FOUND.
      res.sendStatus(StatusCodes.NOT_FOUND);
    }
  }

  async delete(req: any, res: any, next: any): Promise<void> {
    // 1. Si no llega sampleId en la petición  devolvemos FORBIDDEN
    if (req.params.sampleId == null && req.query.name == null) {
      return next(this.errorService.sendError(res, StatusCodes.FORBIDDEN));
    }

    try {
      // 2. Buscamos los samples que coinciden con el filtro de búsqueda.
      const sampleCode = parseInt(req.params.sampleId);
      const sample = await this.sampleService.delete(sampleCode);

      // 3. Devolvemos los samples.
      res.send(sample);
    } catch (err) {
      console.log(err);
      // 4. Si hay algún error en la operación de búsqueda devolvemos un error NOT_FOUND.
      res.sendStatus(StatusCodes.NOT_FOUND);
    }
  }
}
