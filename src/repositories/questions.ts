import { NewAnswerInfo, NewQuestionInfo } from '../controllers/questions';
import connection from '../database/database';

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

export interface UnansweredQuestion {
  id: number;
  question: string;
  student: string;
  class: string;
  submitAt: number;
}

export async function insertQuestion(questionInfo: NewQuestionInfo) {
  const { question, student, tags, class: studentClass } = questionInfo;

  const response = await connection.query(`
    INSERT INTO questions
    (question_text, question_tags, created_by_student, created_by_class)
    VALUES ($1, $2, $3, $4)
    RETURNING question_id AS id
  `, [question, tags, student, studentClass]);

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
    to_char(created_at, 'YYYY-MM-DD HH:MI') AS "submitAt"
    FROM questions
    WHERE question_id = $1
  `, [id]);
  const {
    question, student, class: studentClass, tags, answered, submitAt,
  } : QuestionInfo = resolve.rows[0];
  const response = {
    question, student, class: studentClass, tags, answered, submitAt,
  };
  return response;
}

export async function selectAnswerById(id: QuestionInfo['id']) {
  const answerResponse = await connection.query(`
    SELECT
    to_char(created_at, 'YYYY-MM-DD HH:MI') AS "answeredAt",
    answer_text AS answer,
    created_by as "userId"
    FROM answers
    WHERE question_id = $1
  `, [id]);

  const { answeredAt, answer, userId }: {
    answeredAt: QuestionInfo['answeredAt'], answer: QuestionInfo['answer'], userId: number
  } = answerResponse.rows[0];

  const userAnswer = await connection.query(`
    SELECT user_name AS "answeredBy"
    FROM users 
    WHERE user_id = $1
  `, [userId]);

  const { answeredBy } : {answeredBy: QuestionInfo['answeredBy']} = userAnswer.rows[0];

  const response = { answeredAt, answeredBy, answer };
  return response;
}

export async function insertAnswer(answerInfo: NewAnswerInfo) {
  const { answer, questionId, answeredBy } = answerInfo;
  const response = await connection.query(`
    INSERT INTO answers
    (question_id, answer_text, created_by)
    VALUES ($1, $2, $3)
    RETURNING question_id AS id
  `, [questionId, answer, answeredBy]);

  await connection.query(`
    UPDATE questions
    SET answered = true
    WHERE question_id = $1
  `, [questionId]);
}

export async function selectUnansweredQuestions() {
  const resolve = await connection.query(`
    SELECT
    question_id AS id,
    question_text AS question,
    created_by_student AS student,
    created_by_class AS class,
    to_char(created_at, 'YYYY-MM-DD HH:MI') as "submitAt"
    FROM questions
    WHERE answered = false
  `); // maybe order by date?

  const questionList: UnansweredQuestion[] = resolve.rows;
  return questionList;
}

export async function updateQuestionInfo() {
//
}
