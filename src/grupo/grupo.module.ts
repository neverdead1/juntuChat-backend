import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GrupoService } from './grupo.service';
import { GrupoController } from './grupo.controller';
import { Grupo, GrupoSchema } from './grupo.schema';
import { Chat, ChatSchema } from 'src/chat/chat.schema';
import { GrupoGateway } from './grupo.gateway';

@Module({
  imports: [MongooseModule.forFeature([{ name: Grupo.name, schema: GrupoSchema }]),
            MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),],
  controllers: [GrupoController],
  providers: [GrupoService, GrupoGateway],
  exports: [GrupoService],
})
export class GrupoModule {}
