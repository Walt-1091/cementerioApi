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


@Controller('auth')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ 
        summary: 'Login user and obtain access token',
        description: 'Requires authentication. Click the Authorize button and enter your access token first.'
      })
      @ApiResponse({
        status: 200,
        description: 'User logged in successfully'
      })
      @ApiResponse({
        status: 400,
        description: 'Bad Request - Invalid or missing credentials',
      })
  @HttpCode(200)
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}