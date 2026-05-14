import { Niche } from 'src/niches/nice.entity/niche.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'niche_occupants' })
@Index('idx_niche_occupants_niche_id', ['nicheId'])
export class NicheOccupantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'niche_id', type: 'int', nullable: true  })
  nicheId: number;

  @ManyToOne(() => Niche, (niche) => niche.occupants, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'niche_id' })
  niche: Niche;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ name:"lastName", type: 'varchar', length: 50, nullable: true })
  lastName: string;

  @Column({ name: 'fechaNacimiento', type: 'timestamp', nullable: true  })
  fechaNacimiento: Date;

  @Column({ name: 'fechaDefuncion', type: 'timestamp', nullable: true  })
  fechaDefuncion: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}