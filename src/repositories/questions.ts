/* eslint-disable no-unused-vars */
import { NewQuestionInfo } from '../controllers/questions';
import connection from '../database/database';

export interface UserInfo {
  id: number;
  name: string;
  class: string;
  token: string;
  points?: number;
}

export interface QuestionInfo {
  id: number;
  question: string;
  student: UserInfo;
  class: string;
  tags: string;
  answered: boolean;
  submitAt: number;
  answeredAt?: number;
  answeredBy?: string;
  answer?: string;
  points: number;
}

export async function insertQuestion(questionInfo: NewQuestionInfo) {
  const { question, student, tags } = questionInfo;

  const response = await connection.query(`
    INSERT INTO questions
    (question_text, question_tags, created_by)
    VALUES ($1, $2, $3)
    RETURNING question_id AS id
  `, [question, tags, student]);

  const { id }: {id: QuestionInfo['id']} = response.rows[0];
  return id;
}

export async function selectQuestionById() {
  //
}

export async function insertAnswer() {
//
}

export async function selectUnansweredQuestions() {
//
}

export async function insertUser() {
//
}

export async function selectUsersByScore() {
//
}

export async function updateQuestionInfo() {
//
}
