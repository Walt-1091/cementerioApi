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
    private nichesMainRepository: Repository<NicheMain>,
  ) { }

  async create(createNicheMainDto: CreateNicheMainDto): Promise<NicheMain> {
    const niche = this.nichesMainRepository.create(createNicheMainDto);
    return await this.nichesMainRepository.save(niche);
  }

  async findAll(): Promise<NicheMain[]> {
    return this.nichesMainRepository.find({
      relations: {
        niches: {
          occupants: true,
          payments: true,
        },
      },
    });
  }

  async findAllAvailable(): Promise<NicheMain[]> {
    return this.nichesMainRepository
      .createQueryBuilder('nm')
      .leftJoinAndSelect('nm.niches', 'n')
      .where('n.is_active = false OR n.id IS NULL')
      .getMany();
  }

  async findOne(id: number): Promise<NicheMain> {
    const niche = await this.nichesMainRepository.findOne({
      where: { id },
      relations: { niches: { occupants: true, payments: true } },
    });

    if (!niche) {
      throw new NotFoundException(`Niche with ID ${id} not found`);
    }

    return niche;
  }

  async update(id: number, updateNicheMainDto: UpdateNicheMainDto): Promise<NicheMain> {
    const existing = await this.findOne(id);
    const updated = Object.assign(existing, updateNicheMainDto);
    return this.nichesMainRepository.save(updated);
  }
}