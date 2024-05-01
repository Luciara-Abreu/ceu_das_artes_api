import { AppDataSource } from '../../data-source';

async function createDbTest() {
  const connection = await AppDataSource.initialize();
  const queryRunner = connection.createQueryRunner();

  await queryRunner.createDatabase('ceu_das_artes_db_test', true);

  connection.destroy();
}

createDbTest().then(() => console.log('DataBase ceu_das_artes_db_test created!'));
