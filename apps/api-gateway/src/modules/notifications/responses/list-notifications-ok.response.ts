import { ApiProperty } from '@nestjs/swagger';

import { type Notification } from '@challenge/shared';

export class ListNotificationsOkResponse {
  @ApiProperty({
    example: [
      {
        id: '18be5498-37d1-4dda-825c-57a8fad2e30c',
        userId: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
        kind: 'task.status.updated',
        metadata: {
          task: {
            id: '25284ab5-e5b6-4b18-bf31-23b148a39571',
            title: 'Isolar bancos por microservice',
            newStatus: 'REVIEW',
            oldStatus: 'IN_PROGRESS',
            participantIds: ['9503e4b4-de3e-4bce-838d-0a1ae8c20e2b'],
          },
          author: {
            id: '70955226-d197-4d0a-9ea6-3be8372d0503',
            username: 'rafaelolvr',
          },
        },
        createdAt: '2026-01-03T14:40:07.879Z',
      },
      {
        id: 'd4387b2c-3a44-4353-8ce3-44a7267b34c8',
        userId: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
        kind: 'task.comment.created',
        metadata: {
          task: {
            id: 'd43650fd-46ea-4a74-86ac-6dce8f832a74',
            title: 'Criar serviço de autenticação (Auth Service)',
            comment: 'Sim, iniciarei hoje a tarefa e vamos nos comunicando.\n',
            participantIds: [
              '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
              '39694e73-ba63-4943-a658-ff7a19148b84',
            ],
          },
          author: {
            id: '39694e73-ba63-4943-a658-ff7a19148b84',
            username: 'joaoolvr',
          },
        },
        createdAt: '2026-01-02T15:26:39.607Z',
      },
      {
        id: '0bfc0d8c-ce3a-4d72-9ba1-41c8db28cf8c',
        userId: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
        kind: 'task.assigned',
        metadata: {
          task: {
            id: 'd43650fd-46ea-4a74-86ac-6dce8f832a74',
            title: 'Criar serviço de autenticação (Auth Service)',
            priority: 'MEDIUM',
            participantIds: [],
            addedParticipantIds: ['9503e4b4-de3e-4bce-838d-0a1ae8c20e2b'],
          },
          author: {
            id: '39694e73-ba63-4943-a658-ff7a19148b84',
            username: 'joaoolvr',
          },
        },
        createdAt: '2026-01-02T15:24:38.868Z',
      },
      {
        id: 'afa4afd0-534d-489c-8e73-2591fa55e798',
        userId: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
        kind: 'task.created',
        metadata: {
          task: {
            id: '82e66ad2-cf4c-4f06-bfd2-e2ce2becf048',
            title: 'Implementar cadastro de usuário',
            priority: 'URGENT',
          },
          author: {
            id: '39694e73-ba63-4943-a658-ff7a19148b84',
            username: 'joaoolvr',
          },
        },
        createdAt: '2026-01-02T15:24:17.160Z',
      },
      {
        id: '6e2c4603-0297-4a89-899e-04df5f24fa6d',
        userId: '9503e4b4-de3e-4bce-838d-0a1ae8c20e2b',
        kind: 'task.created',
        metadata: {
          task: {
            id: '2c321a56-23b3-4008-aef6-842dddfe5c3a',
            title: 'Configurar conexão do Auth Service com PostgreSQL',
            priority: 'HIGH',
          },
          author: {
            id: '39694e73-ba63-4943-a658-ff7a19148b84',
            username: 'joaoolvr',
          },
        },
        createdAt: '2026-01-02T15:23:35.155Z',
      },
    ],
    description:
      'Array of notifications. Can be empty when no notifications are found..',
  })
  notifications: Notification[];
}
