import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'web'), { prefix: '/static/' });

  const config = new DocumentBuilder()
    .setTitle('APIs Node/NestJS Demo')
    .setDescription(
      'Demo CoreLabs para recrutadores: CRUD completo (GET, POST, PUT, PATCH, DELETE), JWT, Swagger e Redoc.',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag('health')
    .addTag('auth')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Swagger · NestJS Demo',
    jsonDocumentUrl: 'docs-json',
  });

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);

  console.log(`API:          http://localhost:${port}`);
  console.log(`Swagger UI:   http://localhost:${port}/docs`);
  console.log(`OpenAPI JSON: http://localhost:${port}/docs-json`);
  console.log(`Redoc:        http://localhost:${port}/static/redoc.html`);
  console.log(`Demo UI:      http://localhost:${port}/static/`);
}

bootstrap();
