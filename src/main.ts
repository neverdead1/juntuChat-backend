import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  // Esto activa las validaciones de todos los DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,       // elimina propiedades que no están en el DTO
    forbidNonWhitelisted: true, // lanza error si hay propiedades extras
    transform: true,       // convierte los tipos automáticamente
  }));
  
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  
}
bootstrap();
