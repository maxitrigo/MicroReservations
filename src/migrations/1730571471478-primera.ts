import { MigrationInterface, QueryRunner } from "typeorm";

export class Primera1730571471478 implements MigrationInterface {
    name = 'Primera1730571471478'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "resources" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "time" character varying NOT NULL, "duration" integer NOT NULL, "name" character varying NOT NULL, "userId" character varying NOT NULL, CONSTRAINT "PK_632484ab9dff41bba94f9b7c85e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reservation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "time" character varying NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "resourceId" uuid, CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reservation" ADD CONSTRAINT "FK_701ab4e234e7fa7c122adbb68ca" FOREIGN KEY ("resourceId") REFERENCES "resources"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_701ab4e234e7fa7c122adbb68ca"`);
        await queryRunner.query(`DROP TABLE "reservation"`);
        await queryRunner.query(`DROP TABLE "resources"`);
    }

}
