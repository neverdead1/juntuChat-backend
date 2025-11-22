import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Grupo } from 'src/grupo/grupo.schema';
import { Usuario } from 'src/usuario/usuario.schema';

@Schema()
export class Chat extends Document {
  @Prop({ required: true, enum: ['grupo'] })
  tipo_chat: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }] })
  usuarios: mongoose.Types.ObjectId[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Grupo' })
  grupo: Grupo;
}

export const ChatSchema = SchemaFactory.createForClass(Chat); 