import { HttpException, HttpStatus } from '@nestjs/common';

export class WrongUrlException extends HttpException {
  constructor () {
    super('URL is wrong', HttpStatus.BAD_REQUEST);
  }
}