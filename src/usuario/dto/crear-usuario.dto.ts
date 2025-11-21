import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'; 

export class CrearUsuarioDto { 
    
    @IsNotEmpty() 
    nombre: string; 

    @IsEmail() 
    correo: string; 

    @MinLength(6) 
    contrasena: string; 
}