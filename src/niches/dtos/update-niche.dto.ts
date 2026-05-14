import { IsString, IsEmail, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateNicheDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty({ example: 'A-001' })
  @IsString()
  number: string;

  @ApiProperty({ example: '1' })
  @IsNumber()
  @IsOptional()
  nicheMainId: number;

  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  owner: string;

  @ApiProperty({ example: 'Perpetuo', required: false })
  @IsString()
  @IsOptional()
  type?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  identification?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ default: 'active', required: false })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiProperty({ default: true, required: false })
  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}