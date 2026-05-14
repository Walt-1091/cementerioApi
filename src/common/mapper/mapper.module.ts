import { Module } from '@nestjs/common';
import { MapperProvider } from './mapper.provider';

@Module({
  providers: [MapperProvider],
  exports: [MapperProvider],
})
export class MapperModule {}