// src/niche-occupants/niche-occupants.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNicheOccupantDto } from './dtos/create-niche-occupant.dto';
import { UpdateNicheOccupantDto } from './dtos/update-niche-occupant.dto';
import { NicheOccupantEntity } from './niche-occupants.entity/niche_occupants.entity';

@Injectable()
export class NicheOccupantsService {
  constructor(
    @InjectRepository(NicheOccupantEntity)
    private readonly occupantsRepository: Repository<NicheOccupantEntity>,
  ) {}

  async insert(dto: CreateNicheOccupantDto): Promise<NicheOccupantEntity> {
    const occupant = this.occupantsRepository.create({
      nicheId: dto.nicheId,
      name: dto.name,
    });

    return this.occupantsRepository.save(occupant);
  }

  async update(id: number, dto: UpdateNicheOccupantDto): Promise<NicheOccupantEntity> {
    const existing = await this.occupantsRepository.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Niche occupant not found');

    if (dto.nicheId !== undefined) existing.nicheId = dto.nicheId;
    if (dto.name !== undefined) existing.name = dto.name;

    return this.occupantsRepository.save(existing);
  }

  /**
   * getOccupants: por nicheId. Si no mandas nicheId, devuelve todos.
   */
  async getOccupants(nicheId?: number): Promise<NicheOccupantEntity[]> {
    const qb = this.occupantsRepository
      .createQueryBuilder('o')
      .orderBy('o.createdAt', 'DESC');

    if (nicheId) qb.where('o.nicheId = :nicheId', { nicheId });

    return qb.getMany();
  }
}