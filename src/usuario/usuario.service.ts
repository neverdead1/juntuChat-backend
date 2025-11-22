import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Usuario } from './usuario.schema';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';


@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario.name)
    private usuarioModel: Model<Usuario>,
  ) {}


  async crear(dto: CrearUsuarioDto): Promise<Usuario> {
    const existe = await this.usuarioModel.findOne({ correo: dto.correo });
    if (existe) {
      throw new BadRequestException('El correo ya está registrado');
    }

    const usuario = new this.usuarioModel(dto);
    return usuario.save(); // Guarda en MongoDB
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

  
  async login(dto: LoginUsuarioDto) {
    const usuario = await this.usuarioModel.findOne({ correo: dto.correo });
    if (!usuario) throw new NotFoundException('Correo no registrado');
    if (usuario.contrasena !== dto.contrasena)
      throw new UnauthorizedException('Contraseña incorrecta');

    return {
      mensaje: 'Login exitoso',
      usuario,
    };
  }

  async obtenerPorCorreos(correos: string[]): Promise<Usuario[]> {
    return this.usuarioModel.find({ correo: { $in: correos } }).exec();
  } 
  
  async loginGoogle(dto: { correo: string; nombre: string }) {
    let usuario = await this.usuarioModel.findOne({ correo: dto.correo });

    
    if (!usuario) {
      usuario = new this.usuarioModel({
        nombre: dto.nombre,
        correo: dto.correo,
        contrasena: '', 
      });
      try {
        await usuario.save();
      } catch (error) {
        throw new BadRequestException('Error al crear usuario Google');
      }
    }

    return {
      mensaje: 'Login Google exitoso',
      usuario,
    };
  }
}
