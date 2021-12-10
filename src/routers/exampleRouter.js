import { Router } from 'express';
import * as exampleController from '../controllers/example';

const router = new Router();

router.get('/route', exampleController.example1);

router.post('/route', exampleController.example2);

export default router;
