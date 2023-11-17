import { IsNotEmpty, IsUrl } from 'class-validator';

export class UrlDTO {
  @IsNotEmpty({ message: 'URL cannot be empty' })
  @IsUrl({}, { message: 'URL is not valid' })
    url: string;
}