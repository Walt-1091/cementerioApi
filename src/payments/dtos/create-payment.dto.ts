import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: 'ID del nicho' })
  @IsInt()
  @Min(1)
  nicheId: number;

  @ApiPropertyOptional({ example: 'recibo.pdf' })
  @IsOptional()
  @IsString()
  documentName?: string;

  @ApiPropertyOptional({ example: 123456 })
  @IsOptional()
  @IsInt()
  @Min(0)
  documentSize?: number;

  @ApiPropertyOptional({ example: 'application/pdf' })
  @IsOptional()
  @IsString()
  documentMimeType?: string;

  @ApiPropertyOptional({
    description: 'Documento en Base64 (sin "data:...;base64,")',
    example: 'JVBERi0xLjQKJcTl8uXrp/Og0MTGCj...',
  })
  @IsOptional()
  @IsString()
  documentBase64?: string;
}