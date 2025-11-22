import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Chat } from 'src/chat/chat.schema';
import { Usuario } from 'src/usuario/usuario.schema';

@Schema({ timestamps: true })
export class Grupo extends Document {
  
  @Prop({ required: true })
  nombre_grupo: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Chat'})
  id_chat: Chat;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }] })
  usuarios: mongoose.Types.ObjectId[];

}

export const GrupoSchema = SchemaFactory.createForClass(Grupo);
