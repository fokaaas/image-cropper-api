import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

const port = process.env.PORT ?? 3000;

async function bootstrap () {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(port, () => console.info(`Server started on 127.0.0.1:${port}`));
}

bootstrap();
