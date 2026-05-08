import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min, MaxLength, IsDateString } from 'class-validator';

export class CreateNicheOccupantDto {
  @ApiProperty({ example: 1, description: 'ID del nicho' })
  @IsInt()
  @Min(1)
  nicheId: number;

  @ApiProperty({ example: 'Juan Pérez', description: 'Nombre del ocupante' })
  @IsString()
  @MaxLength(255)
  name: string;

  @ApiProperty({ example: 'Pérez', description: 'Apellido del ocupante' })
  @IsString()
  @MaxLength(255)
  lastName: string;

  @ApiProperty({ example: '05/05/1980', description: 'Fecha de nacimiento del ocupante' })
  @IsDateString()
  fechaNacimiento: Date;

  @ApiProperty({ example: '05/05/2026', description: 'Fecha de defunción del ocupante' })
  @IsDateString()
  fechaDefuncion: Date;
}