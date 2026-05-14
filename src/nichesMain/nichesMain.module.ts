import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NicheMain } from './nicheMain.entity/nicheMain.entity';
import { NichesMainController } from './nichesMain.controller';
import { NichesMainService } from './nichesMain.service';

@Module({
  imports: [TypeOrmModule.forFeature([NicheMain])],
  controllers: [NichesMainController],
  providers: [NichesMainService],
  exports: [NichesMainService],
})
export class NichesMainModule {}