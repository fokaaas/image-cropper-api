import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiService } from './api.service';
import { UrlDTO } from '../dto/url.dto';
import { ImageValidationPipe } from '../utils/pipes/ImageValidationPipe';

@Controller('api')
export class ApiController {
  constructor (
    private apiService: ApiService,
  ) {}

  @Get('/status')
  getStatus () {
    return this.apiService.getStatus();
  }

  @Post('/process-image')
  async processImage (
    @Body(ImageValidationPipe) body: UrlDTO,
  ) {
    return this.apiService.processImage(body);
  }
}
