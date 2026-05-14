import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Niche } from './nice.entity/niche.entity';
import { CreateNicheDto } from './dtos/create-niche.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateNicheDto } from './dtos/update-niche.dto';
import { EntityMapper } from 'src/common/utils/entity-mapper.util';

@Injectable()
export class NichesService {
  constructor(
      @InjectRepository(Niche)
      private nichesRepository: Repository<Niche>,
    ) {}

  async create(createNicheDto: CreateNicheDto): Promise<Niche> {
    const niche = this.nichesRepository.create(createNicheDto);
    return await this.nichesRepository.save(niche);
  }

  async findAll(): Promise<Niche[]> {
    return this.nichesRepository.find({
      relations: { occupants: true, payments: true },
    });
  }

  async findOne(id: number): Promise<Niche> {
    const niche = await this.nichesRepository.findOne({
      where: { id },
      relations: { occupants: true, payments: true },
    });
    
    if (!niche) {
      throw new NotFoundException(`Niche with ID ${id} not found`);
    }
    
    return niche;
  }

  async update(id: number, updateNicheDto: UpdateNicheDto): Promise<Niche> {
    const existing = await this.findOne(id);
    EntityMapper.applyUpdates(existing, updateNicheDto);
    return this.nichesRepository.save(existing);
  }

  async remove(id: number): Promise<void> {
    const existing = await this.findOne(id);
    existing.isActive = false;
    await this.nichesRepository.save(existing);
  }
}