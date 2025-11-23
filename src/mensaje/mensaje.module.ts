import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mensaje, MensajeSchema } from './mensaje.schema';
import { MensajeController } from './mensaje.controller';
import { MensajeService } from './mensaje.service';
import { Chat, ChatSchema } from 'src/chat/chat.schema';
import { MensajeGateway } from './mensaje.gateway'; // <--- 1. IMPORTAR

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Mensaje.name, schema: MensajeSchema },
      { name: Chat.name, schema: ChatSchema },
    ]),
  ],
  controllers: [MensajeController],
  providers: [MensajeService, MensajeGateway], // <--- 2. AGREGAR AQUÍ
})
export class MensajeModule {}