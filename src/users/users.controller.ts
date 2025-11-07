import {
  Controller,
  Get,
  UseGuards,
  Req,
  HttpCode,
  UsePipes,
  ValidationPipe,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UsersService } from './users.service';


@Controller('users')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({ 
      summary: 'Get current user information',
      description: 'Requires authentication. Click the Authorize button and enter your access token first.'
    })
    @ApiResponse({
      status: 200,
      description: 'User information retrieved successfully'
    })
    @ApiResponse({
      status: 401,
      description: 'Unauthorized - Invalid or missing token',
    }) 
  @Get('userinfo')
  async userInfo(@Req() req: Request & { user: any }) {
    console.log('Headers:', req.headers);
    return this.userService.findByUsername(req.user.username);
  }
}