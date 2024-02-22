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
            isNullable: true,
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


          // RG

          {
            name: 'rg',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'expeditionDate',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'emissorOrg',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'naturality',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'bornDate',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'age',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'gender',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'motherName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'motherCpf',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'fatherName',
            type: 'varchar',
            isNullable: true,
          },


          // 



          // Beneficio

          {
            name: 'benefitType',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'benefitValue',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'benefitNumber',
            type: 'varchar',
            isNullable: true,
          },

          // 

          // Account

          {
            name: 'bank',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'agency',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'account',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'accountType',
            type: 'varchar',
            isNullable: true,
          },


          {
            name: 'cep',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'district',
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
