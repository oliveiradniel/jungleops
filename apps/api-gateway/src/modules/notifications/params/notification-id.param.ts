import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsUUID } from 'class-validator';

export class NotificationIdParam {
  @ApiProperty({
    example: '1bd252b1-a7da-454f-a738-5ae65966d5ad',
    description: 'UUID of the notification for performing any action.',
  })
  @IsUUID()
  @IsNotEmpty()
  notificationId: string;
}
