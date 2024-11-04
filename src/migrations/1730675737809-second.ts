import { MigrationInterface, QueryRunner } from "typeorm";

export class Second1730675737809 implements MigrationInterface {
    name = 'Second1730675737809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "resources" DROP COLUMN "time"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "resources" ADD "time" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "resources" ADD "date" TIMESTAMP NOT NULL`);
    }

}
