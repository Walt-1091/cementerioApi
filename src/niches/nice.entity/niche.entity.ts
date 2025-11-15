import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';


@Entity('niches')
export class Niche {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  number: string;

  @Column()
  owner: string;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  identification: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: 'active' })
  status: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'date', nullable: true })
  last_payment: Date;

//   @OneToMany(() => NicheOccupant, occupant => occupant.niche)
//   occupants: NicheOccupant[];

//   @OneToMany(() => Payment, payment => payment.niche)
//   payments: Payment[];
}