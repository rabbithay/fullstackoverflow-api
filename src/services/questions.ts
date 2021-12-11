/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import Joi from 'joi';
import { NewQuestionInfo } from '../controllers/questions';
import * as questionRepositories from '../repositories/questions';

export function validateObject({
  object, schema,
}: {object: object, schema: Joi.ObjectSchema<any>}) {
  const validation = schema.validate(object);
  return !validation.error;
}

export async function createQuestion(questionInfo: NewQuestionInfo) {
  const id = await questionRepositories.insertQuestion(questionInfo);
  return id;
}

export async function getUser() {
  //
}
