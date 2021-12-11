/* eslint-disable no-unused-vars */

import {
  ErrorRequestHandler, NextFunction, RequestHandler, Response,
} from 'express';

export async function serverMiddlewareError(
  error: ErrorRequestHandler,
  request: RequestHandler,
  response: Response,
  next: NextFunction,
) {
  console.log({ error, request, response });
  return response.sendStatus(500);
}
