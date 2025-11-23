import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Mensaje, MensajeSchema } from './mensaje.schema';
import { MensajeController } from './mensaje.controller';
import { MensajeService } from './mensaje.service';
import { Chat, ChatSchema } from 'src/chat/chat.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Mensaje.name, schema: MensajeSchema },
      { name: Chat.name, schema: ChatSchema },
    ]),
    
  ],
  controllers: [MensajeController],
  providers: [MensajeService],
})
export class MensajeModule {}
