import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { FileModule } from '../utils/files/file.module';

@Module({
  controllers: [ApiController],
  providers: [ApiService],
  imports: [FileModule],
  exports: [ApiService],
})
export class ApiModule {}
