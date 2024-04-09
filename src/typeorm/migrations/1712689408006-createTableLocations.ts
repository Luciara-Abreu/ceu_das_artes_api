import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class Migrate1712689408006 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'locations',
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
            name: 'takeOnDate',
            type: 'timestamp',
          },
          {
            name: 'devolutionDate',
            type: 'timestamp',
          },
          {
            name: 'status',
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
      'locations',
      new TableForeignKey({
        columnNames: ['bookId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'books',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'locations',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('locations');
  }
}
