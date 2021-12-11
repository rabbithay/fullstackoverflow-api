import './setup';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routers/routesRouter';
import { serverMiddlewareError } from './error/serverMiddlewareErro';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', routes);

app.use(serverMiddlewareError);

export default app;
