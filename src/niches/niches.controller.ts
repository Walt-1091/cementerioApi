import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateNicheDto } from './dtos/create-niche.dto';
import { NichesService } from './niches.service';
import { UpdateNicheDto } from './dtos/update-niche.dto';

@ApiTags('Niches')
@Controller('niches')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NichesController {
  constructor(private readonly nichesService: NichesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo nicho' })
  create(@Body() createNicheDto: CreateNicheDto) {
    return this.nichesService.create(createNicheDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los nichos' })
  findAll() {
    return this.nichesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un nicho por ID' })
  findOne(@Param('id') id: string) {
    return this.nichesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un nicho' })
  update(@Param('id') id: string, @Body() updateNicheDto: UpdateNicheDto) {
    return this.nichesService.update(+id, updateNicheDto);
  }
}