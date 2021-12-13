import { Router } from 'express';
import * as questionsControllers from '../controllers/questions'
import * as usersControllers from '../controllers/users'

const router = Router();

router.post('/questions', questionsControllers.createNewQuestion);

router.get('/questions/:id', questionsControllers.getQuestion);

router.post('/questions/:id', questionsControllers.answerQuestion);

router.get('/questions', questionsControllers.getQuestionList);

router.post('/users', usersControllers.createNewUser);

router.get('/ranking', () => {});

router.put('/questions/:id/up-vote', () => {});

router.put('/questions/:id/down-vote', () => {});

export default router;
