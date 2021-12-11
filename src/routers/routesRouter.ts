import { Router } from 'express';

const router = Router();

router.post('/questions', () => {});

router.get('/questions/:id', () => {});

router.post('/questions/:id', () => {});

router.get('/questions', () => {});

router.post('/users', () => {});

router.get('/ranking', () => {});

router.put('/questions/:id/up-vote', () => {});

router.put('/questions/:id/down-vote', () => {});

export default router;
