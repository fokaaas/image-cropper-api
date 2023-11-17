import { Controller, Get, Post } from '@nestjs/common';
import { ApiService } from './api.service';

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
  async processImage () {
    return;
  }
}
