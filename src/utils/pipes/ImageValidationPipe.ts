import { Injectable, PipeTransform } from '@nestjs/common';
import { UrlDTO } from '../../dto/url.dto';
import { extname } from 'path';
import { InvalidExtensionException } from '../exceptions/InvalidExtensionException';
import axios from 'axios';
import { WrongUrlException } from '../exceptions/WrongUrlException';
import { TooLargeSizeException } from '../exceptions/TooLargeSizeException';

const MAX_SIZE = 1048576;
const EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp'];

@Injectable()
export class ImageValidationPipe implements PipeTransform {
  async transform (body: UrlDTO) {
    const ext = extname(body.url);

    if (!EXTENSIONS.includes(ext)) {
      throw new InvalidExtensionException();
    }

    const { data } =  await axios.get(body.url, { responseType: 'arraybuffer' })
      .catch(() => {
        throw new WrongUrlException(); 
      });

    if (data.length > MAX_SIZE) {
      throw new TooLargeSizeException('1 MB');
    }

    return body;
  }
}