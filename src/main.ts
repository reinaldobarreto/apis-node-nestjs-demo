import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port);
  console.log(`APIs NestJS demo listening on http://localhost:${port}`);
}

bootstrap();
