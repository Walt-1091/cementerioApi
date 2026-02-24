import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SendStaticPasswordDto {
  @ApiProperty({ example: 'admin@example.com' })
  @IsEmail()
  email: string;
}