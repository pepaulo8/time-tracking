import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class CreateRegister1649720578338 implements MigrationInterface {
    name = 'CreateRegister1649720578338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        /* await queryRunner.query(`CREATE TABLE "registers" ("id" SERIAL NOT NULL, "time" character varying NOT NULL, "date" character varying NOT NULL, "userId" integer, CONSTRAINT "REL_a956aa11d5fa8eaf1b3f3da4db" UNIQUE ("userId"), CONSTRAINT "PK_c80e46007c1de9f8d1c59b3b9b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "registers" ADD CONSTRAINT "FK_a956aa11d5fa8eaf1b3f3da4db8" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`); */
        await queryRunner.createTable(
            new Table({
                    name: "registers",
                    columns: [
                        {
                            name: "id",
                            type: "uuid",
                            isPrimary: true
                        },
                        {
                            name: "time",
                            type: "varchar",
                            isNullable: false
                        },
                        {
                            name: "date",
                            type: "varchar",
                            isNullable: false
                        },
                        {
                            name: "userId",
                            type: "uuid",
                        }
                    ],
                    foreignKeys: [
                        {
                          name: "FKUserRegister",
                          referencedTableName: "users",
                          referencedColumnNames: ["id"],
                          columnNames: ["userId"],
                          onDelete: "CASCADE",
                          onUpdate: "CASCADE",
                        },
                      ]
                })
            );

    }

    

    public async down(queryRunner: QueryRunner): Promise<void> {
        //await queryRunner.query(`ALTER TABLE "registers" DROP CONSTRAINT "FK_a956aa11d5fa8eaf1b3f3da4db8"`);
        /* await queryRunner.dropForeignKey(
            "registers",
            "FKUserRegister"
          ); */

          await queryRunner.dropTable("registers");
    }

}
