import { Injectable } from '@nestjs/common';

import { SignalsService } from './signals.service';

import {
  type TaskAuditLogSignal,
  type TaskUpdatedSignal,
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

  handleTaskAuditLog(payload: TaskAuditLogSignal) {
    const { authorId, action } = payload;

    this.signalsService.taskAuditLog({
      authorId,
      action,
    });
  }
}
