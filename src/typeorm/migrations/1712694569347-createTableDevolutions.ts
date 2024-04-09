import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class Migrate1712694569347 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'devolution',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'bookId',
            type: 'uuid',
          },
          {
            name: 'userId',
            type: 'uuid',
          },
          {
            name: 'effectiveDevolution',
            type: 'timestamp',
          },
          {
            name: 'conditionDelivery',
            type: 'varchar',
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    // Adiciona as chaves estrangeiras
    await queryRunner.createForeignKey(
      'devolution',
      new TableForeignKey({
        columnNames: ['bookId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'books',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'devolution',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('devolution');
    const bookIdForeignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('bookId') !== -1);
    const userIdForeignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('userId') !== -1);

    // Remove as chaves estrangeiras
    await queryRunner.dropForeignKey('devolution', bookIdForeignKey);
    await queryRunner.dropForeignKey('devolution', userIdForeignKey);

    // Remove a tabela
    await queryRunner.dropTable('devolution');
  }
}
