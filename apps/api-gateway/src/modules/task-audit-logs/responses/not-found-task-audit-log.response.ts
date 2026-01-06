import { ApiProperty } from '@nestjs/swagger';

export class NotFoundTaskAuditLogResponse {
  @ApiProperty({
    example: 'Task audit log not found.',
    description: 'Task audit log not found.',
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
