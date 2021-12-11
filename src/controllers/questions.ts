/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import { newAnswerSchema } from '../schemas/newAnswerSchema';
import { newQuestionSchema } from '../schemas/newQuestionSchema';
import { positiveIntegerSchema } from '../schemas/positiveIntegerSchema';
import * as questionsService from '../services/questions';

export interface NewQuestionInfo {
  question: string;
  student: string;
  class: string;
  tags: string
}

export interface NewAnswerInfo {
  answer: string
}

export async function createNewQuestion(req: Request, res: Response) {
  const questionInfo: NewQuestionInfo = req.body;

  const isValidBody = questionsService.validateObject({
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
  const isValidParam = questionsService.validateObject({
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
  const isValidParam = questionsService.validateObject({
    object: { number: id },
    schema: positiveIntegerSchema,
  });
  if (!isValidParam) {
    return res.sendStatus(404);
  }

  const answerInfo: NewAnswerInfo = req.body;
  const isValidBody = questionsService.validateObject({
    object: answerInfo,
    schema: newAnswerSchema,
  });
  if (!isValidBody) {
    return res.sendStatus(404);
  }
}

export async function getQuestionList(req: Request, res: Response) {
  //
}

export async function vote(req: Request, res: Response) {
  //
}
