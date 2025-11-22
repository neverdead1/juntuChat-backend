// src/grupo/grupo.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Grupo } from './grupo.schema';
import { CrearGrupoDto } from './dto/crear-grupo.dto';
import { Chat } from 'src/chat/chat.schema';

@Injectable()
export class GrupoService {
  constructor(
    @InjectModel(Grupo.name) private grupoModel: Model<Grupo>,
    @InjectModel(Chat.name) private chatModel: Model<Chat>
  ) {}

  // Crear grupo
 async crear(dto: CrearGrupoDto): Promise<Grupo> {
    // validar grupo duplicado
    const existe = await this.grupoModel.findOne({ nombre_grupo: dto.nombre_grupo });
    if (existe) throw new BadRequestException('El grupo ya existe');

    // 1️⃣ crear el chat
    const chat = new this.chatModel({
      tipo_chat: 'grupo',
      usuarios: dto.usuarios || [],
    });
    await chat.save();

    // 2️⃣ crear el grupo con referencia al chat
    const grupo = new this.grupoModel({
      nombre_grupo: dto.nombre_grupo,
      descripcion: dto.descripcion,
      usuarios: dto.usuarios || [],
      id_chat: chat._id, // aquí usamos el id del chat recién creado
    });

    await grupo.save();

    return grupo;
  }

  // Obtener todos los grupos
  async obtenerTodos(): Promise<Grupo[]> {
    return this.grupoModel.find().populate('id_chat').exec();
  }

  // Obtener grupo por id
  async obtenerPorId(id: string): Promise<Grupo> {
    const grupo = await this.grupoModel.findById(id).populate('id_chat').exec();
    if (!grupo) throw new NotFoundException('Grupo no encontrado');
    return grupo;
  }

  async agregarUsuario(grupoId: string, usuarioId: string) {
    const grupo = await this.grupoModel.findById(grupoId);
    if (!grupo) throw new NotFoundException('Grupo no encontrado');

    const userObjectId = new mongoose.Types.ObjectId(usuarioId);

    // Evita duplicados en el grupo
    if (!grupo.usuarios.some(u => u.equals(userObjectId))) {
      grupo.usuarios.push(userObjectId);
      await grupo.save();
    }

    // Actualizar chat correspondiente
    const chat = await this.chatModel.findById(grupo.id_chat);
    if (!chat) throw new NotFoundException('Chat del grupo no encontrado');

    if (!chat.usuarios.some(u => u.equals(userObjectId))) {
      chat.usuarios.push(userObjectId);
      await chat.save();
    }

    return { mensaje: 'Usuario agregado al grupo y chat correctamente', grupo, chat };
  }

}
