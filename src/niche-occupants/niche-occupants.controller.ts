import { Controller, Get, Post, Body, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateNicheOccupantDto } from './dtos/create-niche-occupant.dto';
import { UpdateNicheOccupantDto } from './dtos/update-niche-occupant.dto';
import { NicheOccupantsService } from './niche-occupants.service';

@ApiTags('NicheOccupants')
@Controller('nicheoccupants')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access_token')
export class NicheOccupantsController {
  constructor(private readonly nicheOccupantsService: NicheOccupantsService) {}

  @Post()
  @ApiOperation({ summary: 'Insertar un ocupante de nicho' })
  insert(@Body() dto: CreateNicheOccupantDto) {
    return this.nicheOccupantsService.insert(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un ocupante de nicho' })
  update(@Param('id') id: string, @Body() dto: UpdateNicheOccupantDto) {
    return this.nicheOccupantsService.update(+id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener ocupantes (opcional por nicho)' })
  @ApiQuery({ name: 'nicheId', required: false, type: Number })
  getOccupants(@Query('nicheId') nicheId?: string) {
    return this.nicheOccupantsService.getOccupants(nicheId ? +nicheId : undefined);
  }
}