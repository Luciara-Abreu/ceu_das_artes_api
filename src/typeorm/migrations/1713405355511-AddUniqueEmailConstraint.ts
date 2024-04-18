import { MigrationInterface, QueryRunner, TableUnique } from 'typeorm';

export class AddUniqueEmailConstraint1713405355511 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createUniqueConstraint(
      'users',
      new TableUnique({
        columnNames: ['email'],
        name: 'UQ_Unique_Email',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('users', 'UQ_Unique_Email');
  }
}
