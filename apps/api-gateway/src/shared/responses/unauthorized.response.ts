import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedResponse {
  @ApiProperty({
    example: 'Unauthorized',
    description: 'HTTP error message.',
  })
  message: string;

  @ApiProperty({
    example: 401,
    description: 'HTTP status code.',
  })
  statusCode: number;
}
