// src/grupo/grupo.controller.ts
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { GrupoService } from './grupo.service';
import { CrearGrupoDto } from './dto/crear-grupo.dto';

@Controller('grupo')
export class GrupoController {
  constructor(private readonly grupoService: GrupoService) {}

  @Post()
  crear(@Body() dto: CrearGrupoDto) {
    return this.grupoService.crear(dto);
  }

  @Get()
  obtenerTodos() {
    return this.grupoService.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id') id: string) {
    return this.grupoService.obtenerPorId(id);
  }

  @Post(':id/agregar-usuario')
  async agregarUsuario(@Param('id') id: string, @Body('usuarioId') usuarioId: string) {
    return this.grupoService.agregarUsuario(id, usuarioId);
  }

  @Get('usuario/:usuarioId')
  obtenerGruposUsuario(@Param('usuarioId') usuarioId: string) {
    return this.grupoService.obtenerGruposPorUsuario(usuarioId);
  }
}
