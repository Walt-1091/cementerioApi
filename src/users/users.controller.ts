import {
  Controller,
  Get,
  UseGuards,
  Req,
  HttpCode,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { UpdateUserPasswordDto } from 'src/users/dtos/user-password.dto';


@Controller('users')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({ 
      summary: 'Obtener información del usuario actual',
      description: 'Requiere autenticación. Haga clic en el botón Autorizar e ingrese su token de acceso primero.'
    })
    @ApiResponse({
      status: 200,
      description: 'Información del usuario obtenida exitosamente'
    })
    @ApiResponse({
      status: 401,
      description: 'No autorizado - Token inválido o ausente',
    }) 
  @Get('userinfo')
  async userInfo(@Req() req: Request & { user: any }) {
    console.log('Headers:', req.headers);
    return this.userService.findByUsername(req.user.username);
  }

  @ApiOperation({ summary: 'Actualizar la información de un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Información del usuario actualizada exitosamente'
  })
  @ApiResponse({
    status: 400,
    description: 'Solicitud incorrecta - Datos inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuario no encontrado',
  })
  @Put('updateuser/:id')
  async updateUser(@Param('id') id: string, @Body() passwordDto: UpdateUserPasswordDto) {
    return this.userService.updateUser(Number(id),  passwordDto.password);
  }
} 