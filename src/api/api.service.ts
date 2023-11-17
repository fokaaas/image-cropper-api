import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

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
}
