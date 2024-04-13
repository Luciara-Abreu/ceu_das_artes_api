import 'express-async-errors';
import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import { AppDataSource } from './data-source';
import routes from './routes';
import { errorMiddleware } from './middlewares/error.middleware';

dotenv.config();

const port = Number(process.env.PORT);
const app = express();

app.use(express.json());
app.use(routes);

AppDataSource.initialize()
  .then(async () => {
    app.use(errorMiddleware);
    app.listen(port, () => {
      console.log('');
      // eslint-disable-next-line prettier/prettier
      console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨');
      // eslint-disable-next-line prettier/prettier
      console.log('✨ 🏆 Server is running on  ==> http://localhost:3000/                                                               🏆 ✨');
      // eslint-disable-next-line prettier/prettier
      console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨');
    });
  })
  .catch((error: any) => {
    console.log('');
    // eslint-disable-next-line prettier/prettier
    console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨');
    console.error('✨🚨 Falha ao conectar ao banco de dados                                      🚨✨');
    // eslint-disable-next-line prettier/prettier
    console.error({ message: error.message, code: error.code});
    console.log('');
    console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨');
  });
