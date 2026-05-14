import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NicheMain } from './nicheMain.entity/nicheMain.entity';
import { UpdateNicheMainDto } from './dtos/update-nicheMain.dto';
import { CreateNicheMainDto } from './dtos/create-nicheMain.dto';

@Injectable()
export class NichesMainService {
  constructor(
      @InjectRepository(NicheMain)
      private nichesRepository: Repository<NicheMain>,
    ) {}

  async create(createNicheMainDto: CreateNicheMainDto): Promise<NicheMain> {
    const niche = this.nichesRepository.create(createNicheMainDto);
    return await this.nichesRepository.save(niche);
  }

  async findAll(): Promise<NicheMain[]> {
  return this.nichesRepository.find({
    where: {
      status: 'libre',
      niches: {
        isActive: false,
      },
    },
    relations: { niches: true },
  });
}

  async findOne(id: number): Promise<NicheMain> {
    const niche = await this.nichesRepository.findOne({
      where: { id },
      relations: { niches: true },
    });
    
    if (!niche) {
      throw new NotFoundException(`Niche with ID ${id} not found`);
    }
    
    return niche;
  }

  async update(id: number, updateNicheMainDto: UpdateNicheMainDto): Promise<NicheMain> {
    await this.findOne(id);
    await this.nichesRepository.update(id, updateNicheMainDto);
    return this.findOne(id);
  }
}