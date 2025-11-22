import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUsuarioDto {
  @IsEmail()
  correo: string;

  @IsNotEmpty()
  contrasena: string;
}
