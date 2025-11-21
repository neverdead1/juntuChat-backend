import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

import { Chat } from 'src/chat/chat.schema';
import { Usuario } from 'src/usuario/usuario.schema';

@Schema({ timestamps: true })
export class Mensaje extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true })
  id_chat: Chat;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true })
  id_usuario: Usuario;

  @Prop({ required: true })
  mensaje: string;
}

export const MensajeSchema = SchemaFactory.createForClass(Mensaje);
