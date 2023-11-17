import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { UrlDTO } from '../dto/url.dto';
import axios from 'axios';
import sharp from 'sharp';
import { FileService } from '../utils/files/file.service';
import { extname } from 'path';

@Injectable()
export class ApiService {
  constructor (
    private fileService: FileService,
  ) {}

  getStatus () {
    const data = fs.readFileSync('package.json', 'utf-8');
    const { dependencies, devDependencies } = JSON.parse(data);

    return {
      isRunning: true,
      dependencies,
      devDependencies,
    };
  }

  async processImage (data: UrlDTO) {
    const response = await axios.get(data.url, { responseType: 'arraybuffer' });

    const imageBuffer = await sharp(response.data)
      .resize({ width: 500, height: 500 })
      .grayscale()
      .toBuffer();

    const url = this.fileService.saveByHash('images', imageBuffer, extname(data.url));

    return { url };
  }
}
