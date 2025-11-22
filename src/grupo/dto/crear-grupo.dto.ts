import { IsNotEmpty, IsString, IsArray, ArrayNotEmpty, IsMongoId, IsOptional } from 'class-validator';

export class CrearGrupoDto {
  @IsNotEmpty()
  @IsString()
  nombre_grupo: string;

  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true }) // cada elemento del array debe ser un ObjectId válido
  usuarios?: string[];
}
