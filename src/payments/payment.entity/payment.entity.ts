import { Niche } from 'src/niches/nice.entity/niche.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'payments' })
@Index('idx_payments_niche_id', ['nicheId'])
@Index('idx_payments_paid_at', ['paidAt'])
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'niche_id', type: 'int' })
  nicheId: number;

  @ManyToOne(() => Niche, (niche) => niche.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'niche_id' })
  niche: Niche;

  @Column({ type: 'bytea', nullable: true })
  document: Buffer | null;

  @Column({ name: 'document_name', type: 'varchar', length: 255, nullable: true })
  documentName: string | null;

  @Column({ name: 'document_size', type: 'int', nullable: true })
  documentSize: number | null;

  @Column({ name: 'document_mime_type', type: 'varchar', length: 100, nullable: true })
  documentMimeType: string | null;

  @CreateDateColumn({ name: 'paid_at', type: 'timestamp' })
  paidAt: Date;
}