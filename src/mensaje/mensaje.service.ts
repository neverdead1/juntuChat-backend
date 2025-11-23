import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mensaje } from './mensaje.schema';
import { Chat } from 'src/chat/chat.schema';
import { CreateMensajeDto } from './dto/create-mensaje.dto';

@Injectable()
export class MensajeService {
  constructor(
    @InjectModel(Mensaje.name) private readonly mensajeModel: Model<Mensaje>,
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>
  ) {}

  /** Crear un mensaje */
  async crear(dto: CreateMensajeDto) {
    const chat = await this.chatModel.findById(dto.id_chat);
    if (!chat) throw new NotFoundException('Chat no encontrado');

    const mensaje = await this.mensajeModel.create(dto);
    return mensaje.populate('id_usuario', 'nombre avatar correo');
  }

  /** Obtener mensajes por chat */
  async obtenerPorChat(id_chat: string, page = 0, limit = 50) {
    const chat = await this.chatModel.findById(id_chat);
    if (!chat) throw new NotFoundException('Chat no encontrado');

    return this.mensajeModel
      .find({ id_chat })
      .populate('id_usuario', 'nombre avatar correo')
      .sort({ createdAt: 1 }) // orden por fecha de creación
      .skip(page * limit)
      .limit(limit);
  }

  /** Obtener mensajes por grupo */
  async obtenerPorGrupo(id_grupo: string, page = 0, limit = 50) {
  // Como el id del grupo es igual al id del chat
  return this.mensajeModel
    .find({ id_chat: id_grupo }) // usa directamente id_grupo
    .populate('id_usuario', 'nombre avatar correo')
    .sort({ createdAt: 1 })
    .skip(page * limit)
    .limit(limit);
}


}
