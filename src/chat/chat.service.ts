import { Injectable } from '@nestjs/common';
@Injectable()
export class ChatService {
    constructor() {}

    testConnection() {
    console.log('¡El backend está conectado a MongoDB Atlas!');
  }
}
