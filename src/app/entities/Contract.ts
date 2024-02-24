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
import Deal from './Deal';
import Partner from './Partner';
import Contact from './Contact';
import User from './User';
import Convenio from './Convenio';
import Product from './Product';

@Entity()
class Contracts extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne((type) => Deal)
  @JoinColumn()
  deal: Deal;

  @ManyToOne((type) => Partner)
  @JoinColumn()
  partner: Partner;

  @ManyToOne((type) => Contact)
  @JoinColumn()
  contact: Contact;

  @ManyToOne((type) => Convenio)
  @JoinColumn()
  convenio: Convenio;

  @ManyToOne((type) => Product)
  @JoinColumn()
  product: Product;

  @Column()
  name: string;

  @Column({nullable: true})
  bank: string;

  @Column({nullable: true})
  ade: string;

  @ManyToOne((type) => User)
  @JoinColumn()
  seller: User;

  @Column({ type: 'enum', enum: ['EM ANÁLISE', 'CANCELADO', 'PAGO', 'PENDENTE'], default: 'PENDENTE' })
  status: string;

  @Column({ type: 'jsonb', nullable: true })
  activity: Array<{
    tag: string;
    name: string;
    description: string;
    createdBy: { id: string; name: string };
    createdAt: Date;
  }>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default Contracts;
