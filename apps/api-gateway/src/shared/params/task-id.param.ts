import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsUUID } from 'class-validator';

export class TaskIdParam {
  @ApiProperty({
    example: '68254159-63fe-481a-9841-8bca49cb53bc',
    description: 'UUID of the task for performing any action.',
  })
  @IsUUID()
  @IsNotEmpty()
  taskId: string;
}
