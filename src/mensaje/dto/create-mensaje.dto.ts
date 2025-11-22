import { IsNotEmpty, IsString } from 'class-validator';
import { IsMongoId } from 'class-validator';

export class CreateMensajeDto {
  @IsMongoId()
  id_chat: string;

  @IsMongoId()
  id_usuario: string;

  @IsString()
  @IsNotEmpty()
  mensaje: string;
}
