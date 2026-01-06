import { ApiProperty } from '@nestjs/swagger';

export class ConflictTaskResponse {
  @ApiProperty({
    example: 'This title is already in use.',
    description: 'Detailed error message explaining the conflict reason.',
  })
  message: string;

  @ApiProperty({
    example: 'Conflict',
    description: 'Short description of the error type.',
  })
  error: string;

  @ApiProperty({
    example: 409,
    description: 'HTTP status code.',
  })
  statusCode: number;
}
