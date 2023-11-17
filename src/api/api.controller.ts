import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiService } from './api.service';
import { UrlDTO } from '../dto/url.dto';
import { ImageValidationPipe } from '../utils/pipes/ImageValidationPipe';
import type { Response } from 'express';
import {
  ApiBadRequestResponse, ApiCreatedResponse,
  ApiOkResponse, ApiOperation,
  ApiPayloadTooLargeResponse,
  ApiTags,
  ApiUnsupportedMediaTypeResponse,
} from '@nestjs/swagger';
import { StatusResponse } from '../responses/status.response';

@ApiTags('API')
@Controller('api')
export class ApiController {
  constructor (
    private apiService: ApiService,
  ) {}

  @ApiOkResponse({
    type: StatusResponse,
    description: 'Information about project status and dependencies',
  })
  @ApiOperation({
    summary: 'Get information about server working and dependencies',
  })
  @Get('/status')
  getStatus () {
    return this.apiService.getStatus();
  }

  @ApiCreatedResponse({
    description: 'Processed binary image that can be downloaded',
  })
  @ApiUnsupportedMediaTypeResponse({
    description: 'File extension is wrong',
  })
  @ApiPayloadTooLargeResponse({
    description: 'The file size exceeds 1 MB',
  })
  @ApiBadRequestResponse({
    description: 'URL is wrong',
  })
  @ApiOperation({
    summary: 'Process the image by cropping it 200x200 and adding a grayscale filter',
  })
  @Post('/process-image')
  async processImage (
    @Body(ImageValidationPipe) body: UrlDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.apiService.processImage(body, res);
  }
}
