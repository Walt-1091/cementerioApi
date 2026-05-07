import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min, MaxLength, IsDateString } from 'class-validator';

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

  @ApiPropertyOptional({ example: 'Pérez', description: 'Apellido del ocupante (opcional)' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  lastName?: string;

  @ApiPropertyOptional({ example: '05/05/1980', description: 'Fecha de nacimiento del ocupante (opcional)' })
  @IsOptional()
  @IsDateString()
  fechaNacimiento?: string;

  @ApiPropertyOptional({ example: '05/05/2026', description: 'Fecha de defunción del ocupante (opcional)' })
  @IsOptional()
  @IsDateString()
  fechaDefuncion?: string;
}