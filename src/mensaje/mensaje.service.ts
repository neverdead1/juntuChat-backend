import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mensaje } from './mensaje.schema';
import { Chat } from 'src/chat/chat.schema';
import { CreateMensajeDto } from './dto/create-mensaje.dto';
import { MensajeGateway } from './mensaje.gateway'; // <--- 1. IMPORTAR

@Injectable()
export class MensajeService {
  constructor(
    @InjectModel(Mensaje.name) private readonly mensajeModel: Model<Mensaje>,
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
    private readonly mensajeGateway: MensajeGateway // <--- 2. INYECTAR
  ) {}

  /** Crear un mensaje */
  async crear(dto: CreateMensajeDto) {
    const chat = await this.chatModel.findById(dto.id_chat);
    if (!chat) throw new NotFoundException('Chat no encontrado');

    // 1. Guardar en BD
    const mensaje = await this.mensajeModel.create(dto);
    
    // 2. Popular datos del usuario (Nombre, foto, etc)
    const mensajePopulado = await mensaje.populate('id_usuario', 'nombre avatar correo');

    // 3. 🔥 EMITIR EL EVENTO EN TIEMPO REAL
    this.mensajeGateway.emitirMensaje(mensajePopulado);

    return mensajePopulado;
  }

  // ... (El resto de métodos 'obtenerPorChat' y 'obtenerPorGrupo' se quedan igual)
  async obtenerPorChat(id_chat: string, page = 0, limit = 50) {
    // ... (código existente)
    return this.mensajeModel
      .find({ id_chat })
      .populate('id_usuario', 'nombre avatar correo')
      .sort({ createdAt: 1 })
      .skip(page * limit)
      .limit(limit);
  }

  async obtenerPorGrupo(id_grupo: string, page = 0, limit = 50) {
    // ... (código existente)
    return this.mensajeModel
    .find({ id_chat: id_grupo }) 
    .populate('id_usuario', 'nombre avatar correo')
    .sort({ createdAt: 1 })
    .skip(page * limit)
    .limit(limit);
  }
}