import { MigrationInterface, QueryRunner } from "typeorm";

export class Tercera1730728016214 implements MigrationInterface {
    name = 'Tercera1730728016214'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD "date" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD "date" TIMESTAMP NOT NULL`);
    }

}
