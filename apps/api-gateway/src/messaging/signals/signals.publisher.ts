import { Injectable } from '@nestjs/common';

import { SignalsService } from './signals.service';

import {
  type TaskAuditLogSignal,
  type TaskUpdatedSignal,
  type TaskCommentCreatedSignal,
} from '@challenge/shared';

@Injectable()
export class SignalsPublisher {
  constructor(private readonly signalsService: SignalsService) {}

  handleTaskUpdated(payload: TaskUpdatedSignal) {
    const { authorId, task } = payload;

    this.signalsService.taskUpdated({
      authorId,
      task,
    });
  }

  handleTaskCommentCreated(payload: TaskCommentCreatedSignal) {
    const { authorId, taskId } = payload;

    this.signalsService.taskCommentCreated({
      authorId,
      taskId,
    });
  }

  handleTaskAuditLog(payload: TaskAuditLogSignal) {
    const { authorId, action } = payload;

    this.signalsService.taskAuditLog({
      authorId,
      action,
    });
  }
}
