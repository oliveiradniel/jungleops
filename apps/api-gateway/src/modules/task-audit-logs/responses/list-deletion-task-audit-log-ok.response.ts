import { ApiProperty } from '@nestjs/swagger';

import { ListDeletionTaskAuditLogWithAuthor } from '@challenge/shared';

export class ListDeletionTaskAuditLogOkResponse {
  @ApiProperty({
    example: [
      {
        id: '4c023b5f-8e12-49fb-b55e-2fb2ba155ca3',
        authorId: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
        task: {
          id: '82e66ad2-cf4c-4f06-bfd2-e2ce2becf048',
          authorId: '39694e73-ba63-4943-a658-ff7a19148b84',
          lastEditedBy: null,
          title: 'Implementar cadastro de usuário',
          description:
            'Criar endpoint para cadastro de usuários com validação de dados, hash de senha (bcrypt) e persistência no banco de dados.',
          term: '2026-01-05',
          priority: 'URGENT',
          status: 'TODO',
          comments: [],
          createdAt: '2026-01-02T15:24:17.059Z',
        },
        deletedAt: '2026-01-06T16:13:34.698Z',
        author: {
          id: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
          email: 'kadadniel@gmail.com',
          username: 'kadadniel',
          createdAt: '2026-01-02T14:54:35.766Z',
        },
      },
    ],
    description: 'List all deletion task audit logs.',
  })
  taskAuditLogs: ListDeletionTaskAuditLogWithAuthor[];
}
