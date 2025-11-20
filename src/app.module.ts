import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { ChatGateway } from './chat/chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ChatModule,
    MongooseModule.forRoot('mongodb+srv://jhoanmijael_db_user:mYFYupBeXAeujodZ@chatcolaborativo.m8cvux3.mongodb.net/?appName=chatColaborativo'),
  ],
  controllers: [],
  providers: [], //"ChatGateway" exportamos el getway creado de chat.gateway
})
export class AppModule {}
