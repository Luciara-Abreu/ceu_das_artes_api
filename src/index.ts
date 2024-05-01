import { app } from './app';
import { AppDataSource } from './data-source';
import dotenv from 'dotenv';

dotenv.config({ path: process.env.ENV === 'test' ? '.env.test' : '.env' });

const port = Number(process.env.PORT);
AppDataSource.initialize()
  .then(async () => {
    app.listen(port, () => {
      console.log('');
      // eslint-disable-next-line prettier/prettier
      console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨');
      // eslint-disable-next-line prettier/prettier
      console.log('✨ 🏆 Server is running on  ==> http://localhost:3000/ 🏆 ✨');
      // eslint-disable-next-line prettier/prettier
      console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨');
    });
  })
  .catch((error: any) => {
    console.log('');
    // eslint-disable-next-line prettier/prettier
    console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨');
    console.error('✨🚨 Falha ao conectar ao banco de dados    🚨✨');
    console.log('✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨');
    console.error({ message: error.message, code: error.code });
  });
