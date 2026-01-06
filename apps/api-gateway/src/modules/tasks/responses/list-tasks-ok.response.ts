import { ApiProperty } from '@nestjs/swagger';

import { Task } from '@challenge/shared';

export class ListTasksOkResponse {
  @ApiProperty({
    example: [
      {
        id: '68254159-63fe-481a-9841-8bca49cb53bc',
        title: 'Desenvolver interface de login',
        description:
          'Desenvolva a interface de login com foco em UX e acessibilidade.',
        term: '2025-11-28',
        priority: 'LOW',
        status: 'TODO',
        createdAt: '2025-11-12T15:07:33.303Z',
      },
      {
        id: 'f95bbf1c-2829-4540-902f-ee718dded518',
        title: 'Adicione Swagger à API',
        description:
          'Integre Swagger ao NestJS e documente todos os  tipos de retorno possíveis.',
        term: '2025-11-26',
        priority: 'URGENT',
        status: 'IN_PROGRESS',
        createdAt: '2025-11-12T15:43:36.459Z',
      },
    ],
    description: 'List of all available comments on a task.',
  })
  tasks: Task[];

  @ApiProperty({
    example: 2,
    description: 'Total number of tasks.',
  })
  total: number;

  @ApiProperty({
    example: 1,
    description: 'Total number of pages.',
  })
  totalPages: number;

  @ApiProperty({
    example: false,
    description: 'Indicates whether there is a next page.',
  })
  hasNext: boolean;

  @ApiProperty({
    example: false,
    description: 'Indicates whether there is a previous page.',
  })
  hasPrevious: boolean;
}
