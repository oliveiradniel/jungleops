import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsUUID } from 'class-validator';

export class UserIdDTO {
  @ApiProperty({
    example: '75254122-63fe-481a-9841-8bca49cb53bc',
    description: 'User UUID to be used to associate with a task.',
  })
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
