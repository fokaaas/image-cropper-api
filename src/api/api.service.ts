import { Injectable, StreamableFile } from '@nestjs/common';
import type { Response } from 'express';
import * as fs from 'fs';
import { UrlDTO } from '../dto/url.dto';
import axios from 'axios';
import sharp from 'sharp';
import { extname } from 'path';

@Injectable()
export class ApiService {
  getStatus () {
    const data = fs.readFileSync('package.json', 'utf-8');
    const { dependencies, devDependencies } = JSON.parse(data);

    return {
      isRunning: true,
      dependencies,
      devDependencies,
    };
  }

  async processImage (data: UrlDTO, res: Response) {
    const fileResponse = await axios.get(data.url, { responseType: 'arraybuffer' });

    const buffer = await sharp(fileResponse.data)
      .resize({ width: 500, height: 500 })
      .grayscale()
      .toBuffer();

    res.set({
      'Content-Type': `image/${extname(data.url).slice(1)}`,
      'Content-Disposition': `attachment; filename="result${extname(data.url)}"`,
    });

    return new StreamableFile(buffer);
  }
}
