import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Usuario } from 'src/usuario/usuario.schema';

@Schema()
export class Chat extends Document {
  @Prop({ required: true, enum: ['individual', 'grupo'] })
  tipo_chat: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }] })
  usuarios: Usuario[];

  @Prop({
    type: {
      id_grupo: { type: mongoose.Schema.Types.ObjectId },
      nombre_grupo: String,
    },
    required: false,
  })
  grupo?: {
    id_grupo: mongoose.Schema.Types.ObjectId;
    nombre_grupo: string;
  };
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
