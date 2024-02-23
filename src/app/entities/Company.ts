import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Pipeline from "./Pipeline";
import Users from "./User";

@Entity()
class Companies extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  site: string;

  @Column({ nullable: true })
  picture: string;

  @ManyToOne((type) => Pipeline)
  @JoinColumn()
  pipeline: Pipeline;

  @ManyToOne((type) => Users)
  @JoinColumn()
  user: Users;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default Companies;
