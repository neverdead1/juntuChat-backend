import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { MensajeService } from './mensaje.service';
import { CreateMensajeDto } from './dto/create-mensaje.dto';

@Controller('mensaje')
export class MensajeController {
  constructor(private readonly mensajeService: MensajeService) {}

  @Post()
  crear(@Body() dto: CreateMensajeDto) {
    return this.mensajeService.crear(dto);
  }

  @Get('chat/:id_chat')
  obtenerPorChat(@Param('id_chat') id_chat: string) {
    return this.mensajeService.obtenerPorChat(id_chat);
  }
}
