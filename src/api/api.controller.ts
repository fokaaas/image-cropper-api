import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiService } from './api.service';
import { UrlDTO } from '../dto/url.dto';
import { ImageValidationPipe } from '../utils/pipes/ImageValidationPipe';
import type { Response } from 'express';

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
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.apiService.processImage(body, res);
  }
}
