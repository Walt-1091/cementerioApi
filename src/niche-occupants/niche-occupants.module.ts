// src/niche-occupants/niche-occupants.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NicheOccupantsController } from './niche-occupants.controller';
import { NicheOccupantsService } from './niche-occupants.service';
import { NicheOccupantEntity } from './niche-occupants.entity/niche_occupants.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NicheOccupantEntity])],
  controllers: [NicheOccupantsController],
  providers: [NicheOccupantsService],
  exports: [NicheOccupantsService],
})
export class NicheOccupantsModule {}