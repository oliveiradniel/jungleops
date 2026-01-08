import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedAuthResponse {
  @ApiProperty({
    example: 'Invalid credentials.',
    description: 'Email or password invalid.',
  })
  message: string;

  @ApiProperty({
    example: 'Unauthorized',
    description: 'Short description of the error type.',
  })
  error: string;

  @ApiProperty({
    example: 401,
    description: 'HTTP status code.',
  })
  statusCode: number;
}
