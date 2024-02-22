import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createProduct16310396123234 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'convenio',
            type: 'uuid',
          },
          {
            name: 'country',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'state',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'site',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'picture',
            type: 'varchar',
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
      'products',
      new TableForeignKey({
        columnNames: ['convenio'],
        referencedTableName: 'convenios', // Substitua 'nome_da_outra_tabela' pelo nome correto da tabela
        referencedColumnNames: ['id'] // Substitua 'id' pela coluna de referência na outra tabela
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
