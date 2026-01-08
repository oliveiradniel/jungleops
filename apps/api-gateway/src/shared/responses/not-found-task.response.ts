import { ApiProperty } from '@nestjs/swagger';

export class NotFoundTaskResponse {
  @ApiProperty({
    example: 'Task not found.',
    description: 'Task not found.',
  })
  message: string;

  @ApiProperty({
    example: 'Not Found',
    description: 'Short description of the error type.',
  })
  error: string;

  @ApiProperty({
    example: 404,
    description: 'HTTP status code.',
  })
  statusCode: number;
}
