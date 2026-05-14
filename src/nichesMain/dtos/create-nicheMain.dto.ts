import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNicheMainDto {
  @ApiProperty({ example: 'A-001' })
  @IsString()
  number: string;

  @ApiProperty({ example: 'Perpetuo', required: false })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ default: 'active', required: false })
  @IsString()
  @IsOptional()
  status?: string;
}