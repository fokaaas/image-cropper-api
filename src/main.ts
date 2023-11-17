import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, () =>
    console.info('Server started on 127.0.0.1:3000'),
  );
}
bootstrap();
