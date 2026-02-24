import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Niche } from './nice.entity/niche.entity';
import { CreateNicheDto } from './dtos/create-niche.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateNicheDto } from './dtos/update-niche.dto';

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
    await this.findOne(id);
    await this.nichesRepository.update(id, updateNicheDto);
    return this.findOne(id);
  }
}