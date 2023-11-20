import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createContract1700396454685 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'contracts',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'deal',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'partner',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'bank',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'deadline',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'priority',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['DONE', 'LOST', 'INPROGRESS', 'PENDING'],
            default: `'INPROGRESS'`,
          },
          {
            name: 'activity',
            type: 'jsonb',
            isNullable: true,
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
          {
            name: 'deletedAt',
            type: 'timestamp',
          },
        ],
      })
    );


    await queryRunner.createForeignKey(
      'contracts',
      new TableForeignKey({
        columnNames: ['partner'],
        referencedTableName: 'partners',
        referencedColumnNames: ['id']
      })
    );


    await queryRunner.createForeignKey(
      'contracts',
      new TableForeignKey({
        columnNames: ['deal'],
        referencedTableName: 'deals',
        referencedColumnNames: ['id']
      })
    );

    await queryRunner.createForeignKey(
      'contracts',
      new TableForeignKey({
        columnNames: ['bank'],
        referencedTableName: 'partners',
        referencedColumnNames: ['id']
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('contracts');
  }
}
