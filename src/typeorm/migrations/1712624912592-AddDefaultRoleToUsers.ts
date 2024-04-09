import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDefaultRoleToUsers1712624912592 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users ALTER COLUMN role SET DEFAULT 1`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users ALTER COLUMN role DROP DEFAULT`);
  }
}
