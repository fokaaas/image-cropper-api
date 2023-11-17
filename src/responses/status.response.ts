import { ApiProperty } from '@nestjs/swagger';

export class StatusResponse {
  @ApiProperty({
    description: 'Indicator whether the service is working',
  })
    isRunning: boolean;

  @ApiProperty({
    description: 'An object containing project dependencies and versions',
  })
    dependencies: object;

  @ApiProperty({
    description: 'An object containing development project dependencies and versions',
  })
    devDependencies: object;
}