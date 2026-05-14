import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NichesController } from './niches.controller';
import { NichesService } from './niches.service';
import { Niche } from './nice.entity/niche.entity';
import { MapperModule } from 'src/common/mapper/mapper.module';

@Module({
  imports: [TypeOrmModule.forFeature([Niche]), MapperModule],
  controllers: [NichesController],
  providers: [NichesService],
  exports: [NichesService],
})
export class NichesModule {}