import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [ChatModule],
  controllers: [],
  providers: [], //"ChatGateway" exportamos el getway creado de chat.gateway
})
export class AppModule {}
