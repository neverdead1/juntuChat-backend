// src/grupo/grupo.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Grupo } from './grupo.schema';
import { CrearGrupoDto } from './dto/crear-grupo.dto';
import { Chat } from 'src/chat/chat.schema';
import { GrupoGateway } from './grupo.gateway';

@Injectable()
export class GrupoService {
  constructor(
    @InjectModel(Grupo.name) private grupoModel: Model<Grupo>,
    @InjectModel(Chat.name) private chatModel: Model<Chat>,
    private readonly grupoGateway: GrupoGateway,
  ) {}

  async crear(dto: CrearGrupoDto): Promise<Grupo> {
    const existe = await this.grupoModel.findOne({ nombre_grupo: dto.nombre_grupo });
    if (existe) throw new BadRequestException('El grupo ya existe');

    const chat = new this.chatModel({
      tipo_chat: 'grupo',
      usuarios: dto.usuarios || [],
    });
    await chat.save();

    const grupo = new this.grupoModel({
      nombre_grupo: dto.nombre_grupo,
      descripcion: dto.descripcion,
      usuarios: dto.usuarios || [],
      id_chat: chat._id,
    });

    await grupo.save();

    const grupoPopulado = await this.grupoModel
      .findById(grupo._id)
      .populate("id_chat")
      .lean();

    this.grupoGateway.emitirGrupoCreado(grupoPopulado);

    return grupoPopulado as any;
  }

  async obtenerTodos(): Promise<Grupo[]> {
    return this.grupoModel.find().populate('id_chat').exec();
  }

  async obtenerPorId(id: string): Promise<Grupo> {
    const grupo = await this.grupoModel.findById(id).populate('id_chat').exec();
    if (!grupo) throw new NotFoundException('Grupo no encontrado');
    return grupo;
  }

  async agregarUsuario(grupoId: string, usuarioId: string) {
    const grupo = await this.grupoModel.findById(grupoId);
    if (!grupo) throw new NotFoundException('Grupo no encontrado');

    const userObjectId = new mongoose.Types.ObjectId(usuarioId);

    if (!grupo.usuarios.some(u => u.equals(userObjectId))) {
      grupo.usuarios.push(userObjectId);
      await grupo.save();
    }

    const chat = await this.chatModel.findById(grupo.id_chat);
    if (!chat) throw new NotFoundException('Chat del grupo no encontrado');

    if (!chat.usuarios.some(u => u.equals(userObjectId))) {
      chat.usuarios.push(userObjectId);
      await chat.save();
    }

    return { mensaje: 'Usuario agregado correctamente', grupo, chat };
  }

  async obtenerGruposPorUsuario(usuarioId: string): Promise<Grupo[]> {
    return this.grupoModel
      .find({ usuarios: usuarioId })
      .populate('id_chat')
      .populate('usuarios', 'nombre correo') // <--- AGREGAR ESTA LÍNEA
      .exec();
  }
}

