import { WebSocketGateway, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true }) // Permite conexiones desde tu frontend
export class GrupoGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log("Socket Grupo inicializado");
  }

  emitirGrupoCreado(grupo: any) {
    this.server.emit('grupo-creado', grupo);
  }
}
