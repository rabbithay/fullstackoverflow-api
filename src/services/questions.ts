import { NewAnswerInfo, NewQuestionInfo } from '../controllers/questions';
import * as questionRepositories from '../repositories/questions';
import { selectUserByToken } from '../repositories/users';

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
  const user = await selectUserByToken(token);
  return user;
}

export async function answerQuestion(answer: NewAnswerInfo) {
  await questionRepositories.insertAnswer(answer);
}

export async function getQuestions() {
  const questions = await questionRepositories.selectUnansweredQuestions();
  return questions;
}
