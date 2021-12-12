/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { newUserSchema } from '../schemas/newUserSchema';
import { validateObject } from '../services/utils';
import * as userServices from '../services/users';

interface NewUserInfo {
  name: string;
  class: string;
}

export async function createNewUser(req: Request, res: Response) {
  const userInfo: NewUserInfo = req.body;

  const isValidBody = validateObject({
    object: userInfo,
    schema: newUserSchema,
  });

  if (!isValidBody) {
    return res.sendStatus(404);
  }

  const token = uuid();

  await userServices.createNewUser({ ...userInfo, token });

  return res.status(201).send({ token });
}

export async function getTopUsers(req: Request, res: Response) {
  //
}
