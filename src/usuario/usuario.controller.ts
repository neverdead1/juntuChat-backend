//endpoints http
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CrearUsuarioDto } from './dto/crear-usuario.dto';
import { LoginUsuarioDto } from './dto/login-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  crear(@Body() dto: CrearUsuarioDto) {
    return this.usuarioService.crear(dto);
  }

  @Post('login')
  login(@Body() dto: LoginUsuarioDto) {
    return this.usuarioService.login(dto);
  }

  @Get()
  obtenerTodos() {
    return this.usuarioService.obtenerTodos();
  }

  @Get(':id')
  obtenerPorId(@Param('id') id: string) {
    return this.usuarioService.obtenerPorId(id);
  }

  @Put(':id')
  actualizar(@Param('id') id: string, @Body() dto: CrearUsuarioDto) {
    return this.usuarioService.actualizar(id, dto);
  }
}
