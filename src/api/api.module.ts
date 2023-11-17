import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Image, ImageSchema } from '../database/schemas/image.schema';

@Module({
  controllers: [ApiController],
  providers: [ApiService],
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
  ],
  exports: [ApiService],
})
export class ApiModule {}
