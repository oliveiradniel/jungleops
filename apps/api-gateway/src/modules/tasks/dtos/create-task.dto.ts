import { ApiProperty } from '@nestjs/swagger';

import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { TaskPriority, TaskStatus } from '@challenge/shared';

export class CreateTaskDTO {
  @ApiProperty({
    example: 'Desenvolver interface de login',
    description: 'Title of the task.',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: 'Desenvolva a interface de login com foco em UX e acessibilidade.',
    description: 'Detailed description of the task.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '2025-11-28',
    description: 'Deadline for task completion (ISO 8601 format).',
  })
  @IsString()
  @IsNotEmpty()
  term: string;

  @ApiProperty({
    example: 'LOW',
    description: 'Priority level of the task. Defaults to LOW if not provided.',
  })
  @IsEnum(TaskPriority)
  @IsNotEmpty()
  priority: TaskPriority;

  @ApiProperty({
    example: 'TODO',
    description:
      'Current status of the task. Defaults to TODO if not provided.',
  })
  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;
}
