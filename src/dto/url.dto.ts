import { IsNotEmpty, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UrlDTO {
  @ApiProperty({
    description: 'Image URL',
  })
  @IsNotEmpty({ message: 'URL cannot be empty' })
  @IsUrl({}, { message: 'URL is not valid' })
    url: string;
}