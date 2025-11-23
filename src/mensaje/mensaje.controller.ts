import { Controller, Post, Get, Param, Body, Query } from '@nestjs/common';
import { MensajeService } from './mensaje.service';
import { CreateMensajeDto } from './dto/create-mensaje.dto';

@Controller('mensaje')
export class MensajeController {
  grupoService: any;
  constructor(private readonly mensajeService: MensajeService) {}

  /** Crear mensaje */
  @Post()
  crear(@Body() dto: CreateMensajeDto) {
    return this.mensajeService.crear(dto);
  }

  /** Obtener mensajes por chat */
  @Get('chat/:id_chat')
  obtenerPorChat(
    @Param('id_chat') id_chat: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page) : 0;
    const limitNum = limit ? parseInt(limit) : 50;
    return this.mensajeService.obtenerPorChat(id_chat, pageNum, limitNum);
  }

  /** Obtener mensajes por grupo */
  @Get('grupo/:id_grupo')
  obtenerPorGrupo(
    @Param('id_grupo') id_grupo: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page) : 0;
    const limitNum = limit ? parseInt(limit) : 50;
    return this.mensajeService.obtenerPorGrupo(id_grupo, pageNum, limitNum);
  }

}
