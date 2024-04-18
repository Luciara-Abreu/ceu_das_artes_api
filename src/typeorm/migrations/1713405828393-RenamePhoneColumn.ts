import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenamePhoneColumn1713405828393 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users RENAME COLUMN fone TO phone`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users RENAME COLUMN phone TO fone`);
  }
}
