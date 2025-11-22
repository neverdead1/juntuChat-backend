import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';

import { MongooseModule } from '@nestjs/mongoose';

import { Grupo, GrupoSchema } from 'src/grupo/grupo.schema';
import { Mensaje, MensajeSchema } from 'src/mensaje/mensaje.schema';
import { Usuario, UsuarioSchema } from 'src/usuario/usuario.schema';
import { Chat, ChatSchema } from './chat.schema';


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
