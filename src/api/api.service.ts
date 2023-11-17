import { Injectable, StreamableFile } from '@nestjs/common';
import type { Response } from 'express';
import * as fs from 'fs';
import { UrlDTO } from '../dto/url.dto';
import axios from 'axios';
import sharp from 'sharp';
import { extname } from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { Image } from '../database/schemas/image.schema';
import { Model } from 'mongoose';

@Injectable()
export class ApiService {
  constructor (
    @InjectModel(Image.name) 
    private imageModel: Model<Image>
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

  async processImage ({ url }: UrlDTO, res: Response) {
    const fileResponse = await axios.get(url, { responseType: 'arraybuffer' });

    const buffer = await sharp(fileResponse.data)
      .resize({ width: 200, height: 200 })
      .grayscale()
      .toBuffer();

    res.set({
      'Content-Type': `image/${extname(url).slice(1)}`,
      'Content-Disposition': `attachment; filename="result${extname(url)}"`,
    });

    const createdImage = new this.imageModel({ url });
    await createdImage.save();

    return new StreamableFile(buffer);
  }
}
