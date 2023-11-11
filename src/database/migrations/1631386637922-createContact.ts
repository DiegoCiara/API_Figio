import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createContact1631386637922 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'contacts',
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
            name: 'company',
            type: 'uuid',
          },
          {
            //ref
            name: 'convenio',
            type: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'cpf',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'state',
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
      'contacts',
      new TableForeignKey({
        columnNames: ['company'],
        referencedTableName: 'companies',
        referencedColumnNames: ['id']
      })
    ); // Criando a foreign key para a coluna 'convenio' se ela se relacionar com outra tabela
    await queryRunner.createForeignKey(
      'contacts',
      new TableForeignKey({
        columnNames: ['convenio'],
        referencedTableName: 'convenios', // Substitua 'nome_da_outra_tabela' pelo nome correto da tabela
        referencedColumnNames: ['id'] // Substitua 'id' pela coluna de referência na outra tabela
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('contacts');
  }
}
