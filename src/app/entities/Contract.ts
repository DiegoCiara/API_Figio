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

// interface ActivityInterface {}

@Entity()
class Contract extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  
  @ManyToOne((type) => Deal ,{ nullable: true})
  @JoinColumn()
  deal: Deal;

  @ManyToOne((type) => Partner ,{ nullable: true})
  @JoinColumn()
  partner: Partner;

  @ManyToOne((type) => Partner ,{ nullable: true}) 
  @JoinColumn()
  bank: Partner;

  // @Column({ type: 'bytea', nullable: true })
  // rgFront: Buffer;

  // @Column({ type: 'bytea', nullable: true })
  // rgBack: Buffer;

  @Column({ nullable: true, type: 'timestamp' })
  deadline: Date;

  @Column({ nullable: true })
  priority: string;

  @Column({ type: 'enum', enum: ['INPROGRESS', 'PENDING', 'LOST', 'WON'], default: 'PENDING' })
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

export default Contract;
