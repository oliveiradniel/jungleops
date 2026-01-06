import { ApiProperty } from '@nestjs/swagger';

import { ListCreationTaskAuditLogWithAuthor } from '@challenge/shared';

export class ListCreationTaskAuditLogOkResponse {
  @ApiProperty({
    example: [
      {
        id: '7a7bf7cc-7a4f-444c-84da-748305b07d80',
        authorId: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
        task: {
          id: '25284ab5-e5b6-4b18-bf31-23b148a39571',
          authorId: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
          title: 'Isolar bancos por microservice',
          description:
            'Garantir que cada microservice possua seu próprio container PostgreSQL e volume persistente, evitando acoplamento de dados.',
          term: '2026-01-04',
          priority: 'HIGH',
          status: 'IN_PROGRESS',
          comments: [],
          createdAt: '2026-01-02T15:29:58.432Z',
        },
        createdAt: '2026-01-02T15:29:58.443Z',
        author: {
          id: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
          email: 'kadadniel@gmail.com',
          username: 'kadadniel',
          createdAt: '2026-01-02T14:54:35.766Z',
        },
      },
      {
        id: 'a8b53f29-efc1-4c9c-96ed-0df745f2112a',
        authorId: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
        task: {
          id: 'baab766f-ce9e-4da1-a5bd-189a38a25784',
          authorId: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
          title: 'Configurar Docker Compose para microservices',
          description:
            'Criar um arquivo docker-compose que orquestre os microservices (auth, tasks, notifications) e seus respectivos bancos de dados.',
          term: '2026-01-14',
          priority: 'URGENT',
          status: 'IN_PROGRESS',
          comments: [],
          createdAt: '2026-01-02T15:29:31.754Z',
        },
        createdAt: '2026-01-02T15:29:31.771Z',
        author: {
          id: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
          email: 'kadadniel@gmail.com',
          username: 'kadadniel',
          createdAt: '2026-01-02T14:54:35.766Z',
        },
      },
      {
        id: 'e5c61c4a-3b45-430f-a11f-eb5aef72c83c',
        authorId: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
        task: {
          id: '96053b05-bd74-48fc-b2e4-0355ad9e38ac',
          authorId: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
          title: 'Implementar validação global de erros',
          description:
            'Criar um filtro global de exceções no NestJS para padronizar respostas de erro (status, mensagem, timestamp e path).',
          term: '2026-01-06',
          priority: 'MEDIUM',
          status: 'TODO',
          comments: [],
          createdAt: '2026-01-02T15:29:07.418Z',
        },
        createdAt: '2026-01-02T15:29:07.428Z',
        author: {
          id: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
          email: 'kadadniel@gmail.com',
          username: 'kadadniel',
          createdAt: '2026-01-02T14:54:35.766Z',
        },
      },
      {
        id: 'bb91c2ce-fb6e-4085-bf12-9006d93c9a9c',
        authorId: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
        task: {
          id: '4b6b9a79-0bb8-4588-ac02-953143dc73de',
          authorId: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
          title: 'Criar migrations iniciais do Auth Service',
          description:
            'Definir migrations para criação das tabelas principais (users, refresh_tokens) garantindo versionamento do schema do banco.',
          term: '2026-01-04',
          priority: 'HIGH',
          status: 'REVIEW',
          comments: [],
          createdAt: '2026-01-02T15:28:38.494Z',
        },
        createdAt: '2026-01-02T15:28:38.502Z',
        author: {
          id: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
          email: 'kadadniel@gmail.com',
          username: 'kadadniel',
          createdAt: '2026-01-02T14:54:35.766Z',
        },
      },
    ],
    description: 'List all creation task audit logs.',
  })
  taskAuditLogs: ListCreationTaskAuditLogWithAuthor[];
}
