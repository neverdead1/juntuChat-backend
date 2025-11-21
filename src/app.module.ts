import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { ChatGateway } from './chat/chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioService } from './usuario/usuario.service';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    ChatModule,
    MongooseModule.forRoot('mongodb+srv://jhoanmijael_db_user:mYFYupBeXAeujodZ@chatcolaborativo.m8cvux3.mongodb.net/?appName=chatColaborativo'),
    UsuarioModule
  ],
  controllers: [],
  providers: [], //"ChatGateway" exportamos el getway creado de chat.gateway
})
export class AppModule {}
