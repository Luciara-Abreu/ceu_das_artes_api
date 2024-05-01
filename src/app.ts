import 'express-async-errors';
import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import { errorMiddleware } from './middlewares/error.middleware';

export const app = express();

app.use(express.json());
app.use(routes);
app.use(errorMiddleware);
