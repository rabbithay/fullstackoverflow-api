/* eslint-disable no-unused-vars */

import {
  Request, Response, NextFunction
} from 'express';

export async function serverMiddlewareError(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  console.log('Middleware de erro: ', error);
  // console.log({ error, request, response });
  return response.sendStatus(500);
}
