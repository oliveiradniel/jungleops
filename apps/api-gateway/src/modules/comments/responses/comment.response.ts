import { ApiProperty } from '@nestjs/swagger';

import type { TaskComment } from '@challenge/shared';

export class CommentResponse {
  @ApiProperty({
    example: {
      id: '61cfbf8b-2ac2-486c-ab00-14d9d67a6eee',
      taskId: '68254159-63fe-481a-9841-8bca49cb53bc',
      userId: 'e273d906-dc4b-4609-9fb7-b41efe35a35e',
      comment:
        'Boa oportunidade para testar componentes acessíveis e ver como eles se comportam em diferentes navegadores.',
      createdAt: '2025-11-13T01:11:57.284Z',
    },
    description: 'Object representing a comment.',
  })
  comment: TaskComment;
}
