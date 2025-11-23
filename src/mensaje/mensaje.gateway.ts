import { WebSocketGateway, WebSocketServer, OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';

// Habilitamos CORS para que el frontend (puerto 3000) se pueda conectar
@WebSocketGateway({ cors: true })
export class MensajeGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit() {
    console.log("Socket de Mensajes inicializado");
  }

  // Esta función la usará el Service para enviar el mensaje a todos
  emitirMensaje(mensaje: any) {
    this.server.emit('nuevo-mensaje', mensaje);
  }
}