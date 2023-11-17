import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { resolve } from 'url';
import { join } from 'path';
import fs from 'fs';

@Injectable()
export class FileService {
  saveByHash (directory: string, file: Uint8Array, ext: string) {
    const fileName = createHash('md5').update(file).digest('hex');
    const filePath = join(__dirname, 'static', directory, fileName + ext);

    fs.writeFileSync(filePath, file);

    return resolve('127.0.0.1:3000', join(directory, fileName + ext));
  }

  getFileContent (path: string) {
    return fs.readFileSync(path, 'utf-8');
  }
}