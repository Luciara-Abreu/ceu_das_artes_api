import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Migrate1712528870547 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'books',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'author',
            type: 'varchar',
          },
          {
            name: 'yearPublication',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'genre',
            type: 'varchar',
          },
          {
            name: 'cover',
            type: 'varchar',
          },
          {
            name: 'quantityPages',
            type: 'int',
          },
          {
            name: 'quantityBook',
            type: 'int',
          },
          {
            name: 'booksInStock',
            type: 'int',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('books');
  }
}
