import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import {
  SIGNAL_KEYS,
  TaskAuditLogSignal,
  TaskUpdatedSignal,
} from '@challenge/shared';

import { NOTIFICATIONS_SIGNALS } from 'src/shared/constants/tokens';
import { TaskCommentCreatedSignal } from '@challenge/shared';

@Injectable()
export class SignalsService {
  constructor(
    @Inject(NOTIFICATIONS_SIGNALS) private readonly client: ClientProxy,
  ) {}

  taskUpdated(payload: TaskUpdatedSignal) {
    const { authorId, task } = payload;

    this.client.emit<string, TaskUpdatedSignal>(SIGNAL_KEYS.TASK_UPDATED, {
      authorId,
      task,
    });
  }

  taskCommentCreated(payload: TaskCommentCreatedSignal) {
    const { authorId, task } = payload;

    this.client.emit<string, TaskCommentCreatedSignal>(
      SIGNAL_KEYS.TASK_COMMENT_CREATED,
      {
        authorId,
        task,
      },
    );
  }

  taskAuditLog(payload: TaskAuditLogSignal) {
    const { authorId, action } = payload;

    this.client.emit<string, TaskAuditLogSignal>(SIGNAL_KEYS.TASK_AUDIT_LOG, {
      action,
      authorId,
    });
  }
}
