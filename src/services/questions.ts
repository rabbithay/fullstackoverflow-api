/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
import Joi from 'joi';
import { NewAnswerInfo, NewQuestionInfo } from '../controllers/questions';
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

export async function getQuestionById(id: number) {
  const question = await questionRepositories.selectQuestionById(id);

  if (question.answered) {
    const answer = await questionRepositories.selectAnswerById(id);
    return { ...question, ...answer };
  }

  return question;
}

export async function getUserByToken(token: string) {
  const user = await questionRepositories.selectUserByToken(token);
  return user;
}

export async function answerQuestion(answer: NewAnswerInfo) {
  await questionRepositories.insertAnswer(answer);
}

export async function getQuestions() {
  const questions = await questionRepositories.selectUnansweredQuestions();
  return questions;
}
