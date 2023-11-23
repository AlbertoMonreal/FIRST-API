//comentario para git
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Service } from 'typedi';

import { ErrorService } from '../../error/error';
import { UserService } from './user.service';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly errorService: ErrorService,
  ) {}

  router(): Router {
    const router = Router();

    router.get('/:userId', (req, res, next) => this.get(req, res, next));

    router.get('/', (req, res, next) => this.getAll(req, res, next));

    router.post('/', (req, res, next) => this.create(req, res, next));

    router.put('/:userId', (req, res, next) => this.update(req, res, next));
    
    router.delete('/:userId', (req, res, next) => this.delete(req, res, next));

    return router;
  }

  async get(req: any, res: any, next: any): Promise<void> {
    // 1. Si no llega userId en la petición  devolvemos FORBIDDEN user
    if (req.params.userId == null && req.query.name == null) {
      return next(this.errorService.sendError(res, StatusCodes.FORBIDDEN));
    }

    try {
      // 2. Buscamos el user que coincide con el filtro de búsqueda y comprobamos que el usuario esté activo.
      const userCode = parseInt(req.params.userId);
      const user = await this.userService.findById(userCode);
      //Comprobamos si está activo.
      const userCorrecto = await this.userService.checkUser(user);
      // 3. Devolvemos el user.
      res.send(userCorrecto);
    } catch (err) {
      console.log(err);
      // 4. Si hay algún error en la operación de búsqueda devolvemos un error NOT_FOUND.
      res.sendStatus(StatusCodes.NOT_FOUND);
    }
  }

  async getAll(req: any, res: any, next: any): Promise<void> {
    try {
      const users = await this.userService.findAll();
      res.send(users);
    } catch (err) {
      console.log(err);
      res.sendStatus(StatusCodes.NOT_FOUND);
    }
  }

  async create(req: any, res: any, next: any): Promise<void> {
    try {
      const user = await this.userService.create(req.body);
      res.send(user);
    } catch (err) {
      console.log(err);
      res.sendStatus(StatusCodes.BAD_REQUEST);
    }
  }

  async update(req: any, res: any, next: any): Promise<void> {
    // 1. Si no llega userId en la petición  devolvemos FORBIDDEN
    if (req.params.userId == null) {
      return next(this.errorService.sendError(res, StatusCodes.FORBIDDEN));
    }
    //Si no tenemos el nombre del usuario, devolvemos FORBIDDEN
    if (req.body.username == undefined) {
      return next(this.errorService.sendError(res, StatusCodes.FORBIDDEN));
    }
    //Si no tenemos el "interruptor", devolvemos FORBIDDEN
    if (req.body.is_active == undefined) {
      return next(this.errorService.sendError(res, StatusCodes.FORBIDDEN));
    }
    try {
      // 2. Buscamos el user que coincide con el filtro de búsqueda.
      const userCode = parseInt(req.params.userId);
      const userName = req.body.username;
      const userInterruptor = req.body.is_active
      const user = await this.userService.update(userCode,userName,userInterruptor);

      // 3. Devolvemos el user actualizado.
      res.send(user);
    } catch (err) {
      console.log(err);
      // 4. Si hay algún error en la operación de búsqueda devolvemos un error NOT_FOUND.
      res.sendStatus(StatusCodes.NOT_FOUND);
    }
  }

  async delete(req: any, res: any, next: any): Promise<void> {
    // 1. Si no llega userId en la petición  devolvemos FORBIDDEN
    if (req.params.userId == null && req.query.name == null) {
      return next(this.errorService.sendError(res, StatusCodes.FORBIDDEN));
    }

    try {
      // 2. Buscamos los users que coinciden con el filtro de búsqueda.
      const userCode = parseInt(req.params.userId);
      const user = await this.userService.delete(userCode);

      // 3. Devolvemos el user eliminado.
      res.send(user);
    } catch (err) {
      console.log(err);
      // 4. Si hay algún error en la operación de búsqueda devolvemos un error NOT_FOUND.
      res.sendStatus(StatusCodes.NOT_FOUND);
    }
  }
}
