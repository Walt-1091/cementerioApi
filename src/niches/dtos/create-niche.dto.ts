import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNicheDto {
  @ApiProperty({ example: 'A-001' })
  @IsString()
  number: string;

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