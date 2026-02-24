import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min, MaxLength } from 'class-validator';

export class CreateNicheOccupantDto {
  @ApiProperty({ example: 1, description: 'ID del nicho' })
  @IsInt()
  @Min(1)
  nicheId: number;

  @ApiProperty({ example: 'Juan Pérez', description: 'Nombre del ocupante' })
  @IsString()
  @MaxLength(255)
  name: string;
}