import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Company from './Company';
import Convenio from './Convenio';

@Entity()
class Contacts extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => Company)
  @JoinColumn()
  company: Company;

  @ManyToOne((type) => Convenio)
  @JoinColumn()
  convenio: Convenio;

  @Column()
  name: string; 

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  cpf: string;

  @Column({ nullable: true })
  phone: string;

// New data

  // RG
  @Column({ nullable: true })
  rg: string;
  @Column({ nullable: true })
  expeditionDate: string;
  @Column({ nullable: true })
  emissorOrg: string;
  @Column({ nullable: true })
  naturality: string;
  @Column({ nullable: true })
  bornDate: string;
  @Column({ nullable: true })
  age: string;
  @Column({ nullable: true })
  gender: string;
  @Column({ nullable: true })
  motherName: string;
  @Column({ nullable: true })
  motherCpf: string;
  @Column({ nullable: true })
  fatherName: string;
  // 

  //Beneficio

  @Column({ nullable: true })
  benefitType: string;
  @Column({ nullable: true })
  benefitValue: string;
  @Column({ nullable: true })
  benefitNumber: string;
  // 

  // Account
  @Column({ nullable: true })
  bank: string;
  @Column({ nullable: true })
  agency: string;
  @Column({ nullable: true })
  account: string;
  @Column({ nullable: true })
  accountType: string;

  // 


  @Column({ nullable: true })
  cep: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  district: string;


  
  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  picture: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default Contacts;
