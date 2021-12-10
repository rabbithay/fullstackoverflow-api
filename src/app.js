import './setup';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import exampleRouter from './routers/exampleRouter';
import { serverMiddlewareError } from './error/serverMiddlewareErro';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', exampleRouter);

app.use(serverMiddlewareError);

export default app;
