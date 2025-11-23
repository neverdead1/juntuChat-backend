import { WebSocketGateway, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class MensajeGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log("Socket de Mensajes inicializado");
  }

  emitirMensaje(mensaje: any) {
    this.server.emit('nuevo-mensaje', mensaje);
  }
}