import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dtos/create-payment.dto';
import { UpdatePaymentDto } from './dtos/update-payment.dto';

@ApiTags('Payments')
@Controller('payments')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access_token')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiOperation({ summary: 'Insertar un pago' })
  insert(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.insert(createPaymentDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un pago' })
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener pagos (opcional por nicheId)' })
  @ApiQuery({ name: 'nicheId', required: false, type: Number })
  getPayments(@Query('nicheId') nicheId?: string) {
    return this.paymentsService.getPayments(nicheId ? +nicheId : undefined);
  }
}