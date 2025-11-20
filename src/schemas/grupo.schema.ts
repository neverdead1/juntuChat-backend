import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Chat } from './chat.schema';

@Schema()
export class Grupo extends Document {
  @Prop({ required: true })
  nombre_grupo: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true })
  id_chat: Chat;
}

export const GrupoSchema = SchemaFactory.createForClass(Grupo);
