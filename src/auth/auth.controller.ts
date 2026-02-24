import {
  Controller,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SendStaticPasswordDto } from './dto/send-static-password.dto';
import { PasswordEmailService } from './password-email.service';


@Controller('auth')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly passwordEmail: PasswordEmailService) {}

  @ApiOperation({ 
        summary: 'Login user y obtener token de acceso',
        description: 'Requiere autenticación. Haga clic en el botón Autorizar e ingrese su token de acceso primero.'
      })
      @ApiResponse({
        status: 200,
        description: 'Usuario autenticado exitosamente y token de acceso generado',
      })
      @ApiResponse({
        status: 400,
        description: 'Solicitud incorrecta - Credenciales inválidas o ausentes',
      })
  @HttpCode(200)
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('sendpassword')
  @ApiOperation({ summary: 'Enviar contraseña estática por correo' })
  sendStaticPassword(@Body() dto: SendStaticPasswordDto) {
    return this.passwordEmail.sendStaticPassword(dto.email);
  }
}