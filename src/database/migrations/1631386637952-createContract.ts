import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createContract1631386637952 implements MigrationInterface {
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
            //ref
            name: 'deal',
            type: 'uuid',
          },
          {
            //ref
            name: 'partner',
            type: 'uuid',
          },
          {
            //ref
            name: 'contact',
            type: 'uuid',
          },
          {
            //ref
            name: 'convenio',
            type: 'uuid',
          },
          {
            //ref
            name: 'product',
            type: 'uuid',
          },
          {
            //ref
            name: 'seller',
            type: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'bank',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ade',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['PAGO', 'CANCELADO', 'EM ANÁLISE', 'PENDENTE'],
            default: `'PENDENTE'`,
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
        referencedTableName: 'partners', // Substitua 'nome_da_outra_tabela' pelo nome correto da tabela
        referencedColumnNames: ['id'] // Substitua 'id' pela coluna de referência na outra tabela
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('contracts');
  }
}
