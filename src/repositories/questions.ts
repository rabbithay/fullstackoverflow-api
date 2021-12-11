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
  id?: number;
  question: string;
  student: string;
  class: string;
  tags: string;
  answered: boolean;
  submitAt: number;
  answeredAt?: number;
  answeredBy?: string;
  answer?: string;
  points?: number;
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

export async function selectQuestionById(id: QuestionInfo['id']) {
  const resolve = await connection.query(`
    SELECT
    question_text AS question,
    created_by_student AS student,
    created_by_class AS class,
    question_tags AS tags,
    answered,
    created_at AS 'submitAt'
    FROM questions
    WHERE question_id = $1
  `, [id]);
  const {question, student, class, tags, answered, submitAt} : QuestionInfo = resolve.rows[0];
  const response = {question, student, class, tags, answered, submitAt};
  return response;
}

export async function selectAnswerById(id: QuestionInfo['id']){
  const answerResponse = await connection.query(`
    SELECT
    created_at AS 'answeredAt',
    answer_text AS answer
    FROM answers
    WHERE question_id = $1
  `, [id]);

  const userAnswer = await connection.query(`
    SELECT user_name AS 'answeredBy'
    FROM users JOIN answers
    WHERE user_id = created_by
  `)

  const {answeredAt, answer}: {
    answeredAt: QuestionInfo['answeredAt'], answer: QuestionInfo['answer']
  } = answerResponse.rows[0];

  const {answeredBy} : {answeredBy: QuestionInfo['answeredBy']} = userAnswer.rows[0];

  const response = {answeredAt, answeredBy, answer}

  return response

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
