import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserPasswordDto {
  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  password: string;
}