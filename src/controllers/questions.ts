/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import authValidate from '../schemas/authValidate';
import { newAnswerSchema } from '../schemas/newAnswerSchema';
import { newQuestionSchema } from '../schemas/newQuestionSchema';
import { positiveIntegerSchema } from '../schemas/positiveIntegerSchema';
import * as questionsService from '../services/questions';
import { validateObject } from '../services/utils';

export interface NewQuestionInfo {
  question: string;
  student: string;
  class: string;
  tags: string
}

export interface NewAnswerInfo {
  answer: string,
  questionId: number,
  answeredBy: number
}

export async function createNewQuestion(req: Request, res: Response) {
  const questionInfo: NewQuestionInfo = req.body;

  const isValidBody = validateObject({
    object: questionInfo,
    schema: newQuestionSchema,
  });

  if (!isValidBody) {
    return res.sendStatus(404);
  }

  const questionId = await questionsService.createQuestion(questionInfo);
  return res.status(201).send(questionId);
}

export async function getQuestion(req: Request, res: Response) {
  const { id } = req.params;
  const isValidParam = validateObject({
    object: { number: id },
    schema: positiveIntegerSchema,
  });

  if (!isValidParam) {
    return res.sendStatus(404);
  }

  const question = questionsService.getQuestionById(Number(id));

  return question;
}

export async function answerQuestion(req: Request, res: Response) {
  const { id } = req.params;
  const isValidParam = validateObject({
    object: { number: id },
    schema: positiveIntegerSchema,
  });
  if (!isValidParam) {
    return res.sendStatus(404);
  }

  const answerBody: {answer: NewAnswerInfo['answer']} = req.body;
  const isValidBody = validateObject({
    object: answerBody,
    schema: newAnswerSchema,
  });
  if (!isValidBody) {
    return res.sendStatus(404);
  }

  const auth = req.headers.authorization;
  const token = authValidate(auth);
  if (!token) return res.sendStatus(404);

  const user = await questionsService.getUserByToken(token);
  if (!user) return res.sendStatus(400);

  const answer: NewAnswerInfo = {
    answer: answerBody.answer,
    questionId: Number(id),
    answeredBy: user.id,
  };

  await questionsService.answerQuestion(answer);

  return res.sendStatus(201);
}

export async function getQuestionList(req: Request, res: Response) {
  const questionList = await questionsService.getQuestions();
  return res.send(questionList);
}

export async function vote(req: Request, res: Response) {
  //
}
