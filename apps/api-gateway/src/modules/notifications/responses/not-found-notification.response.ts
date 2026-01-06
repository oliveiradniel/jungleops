import { ApiProperty } from '@nestjs/swagger';

export class NotFoundNotificationResponse {
  @ApiProperty({
    example: 'Notifications not found.',
    description: 'Notifications not found.',
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
