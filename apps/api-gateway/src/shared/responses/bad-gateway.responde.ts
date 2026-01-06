import { ApiProperty } from '@nestjs/swagger';

export class BadGatewayResponse {
  @ApiProperty({
    example: 'Internal gateway error.',
    description: 'HTTP error message.',
  })
  message: string;

  @ApiProperty({
    example: 502,
    description: 'HTTP status code.',
  })
  statusCode: number;
}
