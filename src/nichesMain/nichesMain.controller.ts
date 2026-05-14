import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { CreateNicheMainDto } from './dtos/create-nicheMain.dto';
import { UpdateNicheMainDto } from './dtos/update-nicheMain.dto';
import { NichesMainService } from './nichesMain.service';

@ApiTags('NichesMain')
@Controller('nichesMain')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access_token')
export class NichesMainController {
  constructor(private readonly nichesService: NichesMainService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo nicho' })
  create(@Body() createNicheMainDto: CreateNicheMainDto) {
    return this.nichesService.create(createNicheMainDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los nichos' })
  findAll() {
    return this.nichesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un nicho por ID' })
  findOne(@Param('id') id: number) {
    return this.nichesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un nicho' })
  update(@Param('id') id: number, @Body() updateNicheMainDto: UpdateNicheMainDto) {
    return this.nichesService.update(id, updateNicheMainDto);
  }
}