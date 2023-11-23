import { NextFunction, Request, Response } from 'express';
import { APIError } from '../../error/error';

export function apiError(err: Error, req: Request, res: Response, _: NextFunction) {
  if (err instanceof APIError) {
    res.status(err.code).json({
      error: err.message,
      success: false,
      code: err.code,
      data: err.extra || {},
    });
    return;
  }
  res.status(400).json({ error: err.message, success: false, code: 400 });
}
