import { ApiProperty } from '@nestjs/swagger';

export class BadRequestBaseResponse {
  @ApiProperty({
    example: 'Bad Request',
    description: 'Short description of the error type.',
  })
  error: string;

  @ApiProperty({
    example: 400,
    description: 'HTTP status code.',
  })
  statusCode: number;
}
