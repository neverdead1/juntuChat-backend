import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { ChatGateway } from './chat/chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioService } from './usuario/usuario.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ConfigModule } from '@nestjs/config';
import { MensajeModule } from './mensaje/mensaje.module';
import { GrupoModule } from './grupo/grupo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ChatModule,
    MongooseModule.forRoot(process.env.MONGO_URI!),
    UsuarioModule,
    GrupoModule,
    MensajeModule
  ],
  controllers: [],
  providers: [], 
})
export class AppModule {}
