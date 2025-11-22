import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mensaje } from './mensaje.schema';
import { CreateMensajeDto } from './dto/create-mensaje.dto';

@Injectable()
export class MensajeService {
  constructor(
    @InjectModel(Mensaje.name)
    private mensajeModel: Model<Mensaje>,
  ) {}

  async crear(createMensajeDto: CreateMensajeDto) {
    return await this.mensajeModel.create(createMensajeDto);
  }

  async obtenerPorChat(id_chat: string) {
    return await this.mensajeModel
      .find({ id_chat })
      .populate('id_usuario', 'nombre correo')
      .sort({ createdAt: 1 });
  }
}
