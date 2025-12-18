import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true }) // IMPORTANTE: cors true para evitar bloqueos
export class ChatGateway implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  public server: Server;

  // Mapa para rastrear: socketId -> userId
  private activeSockets = new Map<string, string>();

  constructor(private readonly chatService: ChatService) {}

  onModuleInit() {
    console.log('ChatGateway (Estado Usuarios) inicializado');
  }

  handleConnection(client: Socket) {
    // El frontend enviará el userId en la conexión
    const userId = client.handshake.query.userId as string;

    if (userId) {
      this.activeSockets.set(client.id, userId);
      console.log(` Usuario conectado: ${userId}`);

      // Avisar a todos que este usuario está online
      this.server.emit('usuario-cambio-estado', { userId, enLinea: true });
      
      // Enviar al que se conecta la lista actual de usuarios en línea
      const usuariosOnline = Array.from(new Set(this.activeSockets.values()));
      client.emit('lista-usuarios-online', usuariosOnline);
    }
  }

  handleDisconnect(client: Socket) {
    const userId = this.activeSockets.get(client.id);
    
    if (userId) {
      this.activeSockets.delete(client.id);
      // Verificamos si al usuario le quedan otras pestañas abiertas
      const sigueConectado = Array.from(this.activeSockets.values()).includes(userId);
      
      if (!sigueConectado) {
        console.log(` Usuario desconectado: ${userId}`);
        this.server.emit('usuario-cambio-estado', { userId, enLinea: false });
      }
    }
  }
}