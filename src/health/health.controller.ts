
import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('health')
export class HealthController {
    constructor() {}
    
  @HttpCode(200)
  @Get()
  async healthCheck() {
    return { status: 'ok' };
  }
}
