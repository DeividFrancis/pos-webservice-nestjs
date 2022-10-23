import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Posweb API')
    .setDescription('The Posweb API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Endpoints para o recurso de auth')
    .addTag('users', 'Endpoints para o recurso de user')
    .addTag('posts', 'Endpoints para o recurso de post')
    .addTag('categorys', 'Endpoints para o recurso de category')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
