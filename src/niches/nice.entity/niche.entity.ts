import { NicheOccupantEntity } from 'src/niche-occupants/niche-occupants.entity/niche_occupants.entity';
import { NicheMain } from 'src/nichesMain/nicheMain.entity/nicheMain.entity';
import { PaymentEntity } from 'src/payments/payment.entity/payment.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('niches')
export class Niche {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => NicheMain, (nicheMain) => nicheMain.niches, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nicheMainId' })
  nichesMain: NicheMain;

  @Column({ type: 'int', nullable: true  })
  nicheMainId: number;

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

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Column({ name: 'last_payment', type: 'date', nullable: true })
  lastPayment: Date;

  @OneToMany(() => NicheOccupantEntity, (occupant) => occupant.niche)
  occupants: NicheOccupantEntity[];

  @OneToMany(() => PaymentEntity, (payment) => payment.niche)
  payments: PaymentEntity[];
}