import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min, MaxLength } from 'class-validator';

export class UpdateNicheOccupantDto {
  @ApiPropertyOptional({ example: 1, description: 'ID del nicho (opcional)' })
  @IsOptional()
  @IsInt()
  @Min(1)
  nicheId?: number;

  @ApiPropertyOptional({ example: 'Juan Pérez', description: 'Nombre del ocupante (opcional)' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;
}