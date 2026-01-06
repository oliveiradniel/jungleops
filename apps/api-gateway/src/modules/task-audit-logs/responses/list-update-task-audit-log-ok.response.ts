import { ApiProperty } from '@nestjs/swagger';

import { ListUpdateTaskAuditLogWithAuthor } from '@challenge/shared';

export class ListUpdateTaskAuditLogOkResponse {
  @ApiProperty({
    example: [
      {
        id: '6c438e28-c86f-43ef-a642-700dd108caa5',
        taskId: '25284ab5-e5b6-4b18-bf31-23b148a39571',
        authorId: '70955226-d197-4d0a-9ea6-3be8372d0503',
        taskTitle: 'Isolar bancos por microservice',
        fieldName: 'status',
        oldValue: 'IN_PROGRESS',
        newValue: 'REVIEW',
        changedAt: '2026-01-03T14:40:07.763Z',
        author: {
          id: '70955226-d197-4d0a-9ea6-3be8372d0503',
          email: 'rafaelolvr@gmail.com',
          username: 'rafaelolvr',
          createdAt: '2026-01-03T14:39:08.800Z',
        },
      },
      {
        id: 'ec334cbd-75cc-4962-9d5a-e77eb2c05bbb',
        taskId: '25284ab5-e5b6-4b18-bf31-23b148a39571',
        authorId: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
        taskTitle: 'Isolar bancos por microservice',
        fieldName: 'priority',
        oldValue: 'HIGH',
        newValue: 'URGENT',
        changedAt: '2026-01-03T14:39:47.228Z',
        author: {
          id: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
          email: 'kadadniel@gmail.com',
          username: 'kadadniel',
          createdAt: '2026-01-02T14:54:35.766Z',
        },
      },
      {
        id: '14e54951-a8e4-42a1-980f-5fd60fd6ff71',
        taskId: '25284ab5-e5b6-4b18-bf31-23b148a39571',
        authorId: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
        taskTitle: 'Isolar bancos por microservice',
        fieldName: 'userIds',
        oldValue: [],
        newValue: [
          {
            id: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
            username: 'kadadniel',
            email: 'kadadniel@gmail.com',
            createdAt: '2026-01-02T14:54:35.766Z',
          },
        ],
        changedAt: '2026-01-03T14:39:35.107Z',
        author: {
          id: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
          email: 'kadadniel@gmail.com',
          username: 'kadadniel',
          createdAt: '2026-01-02T14:54:35.766Z',
        },
      },
      {
        id: 'af9b6238-0225-4ff9-b7d8-ab68ec7897da',
        taskId: 'd43650fd-46ea-4a74-86ac-6dce8f832a74',
        authorId: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
        taskTitle: 'Criar serviço de autenticação (Auth Service)',
        fieldName: 'userIds',
        oldValue: [
          {
            id: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
            username: 'kadadniel',
            email: 'kadadniel@gmail.com',
            createdAt: '2026-01-02T14:54:35.766Z',
          },
        ],
        newValue: [
          {
            id: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
            username: 'kadadniel',
            email: 'kadadniel@gmail.com',
            createdAt: '2026-01-02T14:54:35.766Z',
          },
          {
            id: '39694e73-ba63-4943-a658-ff7a19148b84',
            username: 'joaoolvr',
            email: 'joao@gmail.com',
            createdAt: '2026-01-02T15:22:43.150Z',
          },
        ],
        changedAt: '2026-01-02T15:25:10.239Z',
        author: {
          id: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
          email: 'kadadniel@gmail.com',
          username: 'kadadniel',
          createdAt: '2026-01-02T14:54:35.766Z',
        },
      },
    ],
    description: 'List all update task audit logs.',
  })
  taskAuditLogs: ListUpdateTaskAuditLogWithAuthor[];
}
