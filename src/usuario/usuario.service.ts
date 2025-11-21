//logica del negocio usa el esquema para crear un usuario
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './usuario.schema';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name)
    private usuarioModel: Model<Usuario>,
  ) {}

  async crear(dto: CrearUsuarioDto): Promise<Usuario> {
    const usuario = new this.usuarioModel(dto);
    return usuario.save(); // Esto crea la colección automáticamente en Atlas
  }

  async obtenerTodos(): Promise<Usuario[]> {
    return this.usuarioModel.find().exec();
  }

  async obtenerPorId(id: string): Promise<Usuario | null> {
  return this.usuarioModel.findById(id).exec();
  }

  async actualizar(id: string, dto: CrearUsuarioDto): Promise<Usuario | null> {
  return this.usuarioModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}
