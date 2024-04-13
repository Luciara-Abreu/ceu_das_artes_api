import 'reflect-metadata';
import  dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();
const port = process.env.DB_POSTGRES_PORT as unknown as number | undefined;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: port,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_DATA_BASE,
  // synchronize: process.env.ENV === 'development',
  // logging: false,
  entities: [`${__dirname}/**/entity/*.ts`],
  migrations: [`${__dirname}/**/**/migrations/*.ts`],
});

//PRODUÇÃO

// //Aqui faço a conecxão com o banco de dados postgres criado na vercel, porém não aceita parametros e eu não consigo criar as migrations
// export const dbPool = new Pool({
//   connectionString: process.env.POSTGRES_URL,
// });
