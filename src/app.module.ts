import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { FileModule } from './utils/files/file.module';

@Module({
  imports: [ApiModule, FileModule],
})
export class AppModule {}
