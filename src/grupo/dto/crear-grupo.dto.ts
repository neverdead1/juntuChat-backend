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
  @IsMongoId({ each: true }) 
  usuarios?: string[];
}
