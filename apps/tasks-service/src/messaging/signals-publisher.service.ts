import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import {
  DOMAIN_SIGNAL_KEYS,
  TaskAuditLogSignal,
  TaskCommentCreatedSignal,
  TaskUpdatedSignal,
} from '@challenge/shared';

import { TASKS_CLIENT } from 'src/shared/constants/tokens';

@Injectable()
export class SignalsPublisherService {
  constructor(@Inject(TASKS_CLIENT) private readonly client: ClientProxy) {}

  taskUpdated(payload: TaskUpdatedSignal) {
    const { authorId, task } = payload;

    this.client.emit<string, TaskUpdatedSignal>(
      DOMAIN_SIGNAL_KEYS.TASK_UPDATED,
      {
        authorId,
        task,
      },
    );
  }

  taskCommentCreated(payload: TaskCommentCreatedSignal) {
    const { authorId, task } = payload;

    this.client.emit<string, TaskCommentCreatedSignal>(
      DOMAIN_SIGNAL_KEYS.TASK_COMMENT_CREATED,
      {
        authorId,
        task,
      },
    );
  }

  taskAuditLog(payload: TaskAuditLogSignal) {
    const { authorId, action } = payload;

    this.client.emit<string, TaskAuditLogSignal>(
      DOMAIN_SIGNAL_KEYS.TASK_AUDIT_LOG,
      {
        authorId,
        action,
      },
    );
  }
}
