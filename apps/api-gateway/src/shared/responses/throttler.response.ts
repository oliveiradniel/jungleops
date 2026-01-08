import { ApiProperty } from '@nestjs/swagger';

export class ThrottlerResponse {
  @ApiProperty({
    example: 'Too many requests. Please try again later.',
    description: 'Too many requests, maximum 10 requests/1 second.',
  })
  message: string;

  @ApiProperty({
    example: 'ThrottlerException',
    description: 'Short description of the error type.',
  })
  error: string;

  @ApiProperty({
    example: 429,
    description: 'HTTP status code.',
  })
  statusCode: number;
}
