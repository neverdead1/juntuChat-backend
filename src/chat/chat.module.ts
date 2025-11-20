import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, UsuarioSchema } from 'src/schemas/usuario.schema';
import { Chat, ChatSchema } from 'src/schemas/chat.schema';
import { Mensaje, MensajeSchema } from 'src/schemas/mensaje.schema';
import { Grupo, GrupoSchema } from 'src/schemas/grupo.schema';

@Module({
  providers: [ChatGateway, ChatService],
  imports:   [
                MongooseModule.forFeature([{ name: Usuario.name, schema: UsuarioSchema },
                                           { name: Chat.name, schema: ChatSchema },
                                           { name: Mensaje.name, schema: MensajeSchema },
                                           { name: Grupo.name, schema: GrupoSchema}
                ]),
  ]
})
export class ChatModule {}
