import { TaskComment } from '@challenge/shared';
import { ApiProperty } from '@nestjs/swagger';

export class ListCommentsOkResponse {
  @ApiProperty({
    example: [
      {
        id: '2953d2ce-08b1-42ae-8b7b-19a01bd7f5e5',
        taskId: '68254159-63fe-481a-9841-8bca49cb53bc',
        userId: 'e273d906-dc4b-4609-9fb7-b41efe35a35e',
        comment:
          'Gostei da ideia de focar em UX e acessibilidade, vai melhorar bastante a experiência do usuário.',
        createdAt: '2025-11-13T01:11:45.051Z',
      },
      {
        id: 'b77aac0a-d695-45a6-9eeb-51069c217b98',
        taskId: '68254159-63fe-481a-9841-8bca49cb53bc',
        userId: 'e273d906-dc4b-4609-9fb7-b41efe35a35e',
        comment:
          'Acho que essa task é importante, mas precisamos definir claramente os critérios de sucesso para UX e acessibilidade.',
        createdAt: '2025-11-13T01:11:53.618Z',
      },
      {
        id: '61cfbf8b-2ac2-486c-ab00-14d9d67a6eee',
        taskId: '68254159-63fe-481a-9841-8bca49cb53bc',
        userId: 'e273d906-dc4b-4609-9fb7-b41efe35a35e',
        comment:
          'Boa oportunidade para testar componentes acessíveis e ver como eles se comportam em diferentes navegadores.',
        createdAt: '2025-11-13T01:11:57.284Z',
      },
    ],
    description: 'Array of comments made by users on a specific task.',
  })
  comments: TaskComment[];

  @ApiProperty({
    example: 3,
    description: 'Total number of comments.',
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
