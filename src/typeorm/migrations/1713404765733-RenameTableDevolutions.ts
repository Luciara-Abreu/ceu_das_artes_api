import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameTableDevolutions1713404765733 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE devolution RENAME TO devolutions`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE devolutions RENAME TO devolution`);
  }
}
