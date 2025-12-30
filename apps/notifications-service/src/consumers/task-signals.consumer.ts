import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { RealTimeGateway } from 'src/realtime/realtime.gateway';

import {
  type TaskAuditLogSignal,
  type TaskCommentCreatedSignal,
  type TaskUpdatedSignal,
  SIGNAL_KEYS,
} from '@challenge/shared';

@Controller()
export class TaskSignalsConsumer {
  constructor(private readonly realTimeGateway: RealTimeGateway) {}

  @EventPattern(SIGNAL_KEYS.TASK_UPDATED)
  taskUpdated(@Payload() payload: TaskUpdatedSignal) {
    const { authorId, task } = payload;

    this.realTimeGateway.sinalizeTaskUpdated({ authorId, task });
  }

  @EventPattern(SIGNAL_KEYS.TASK_COMMENT_CREATED)
  taskCommentCreated(@Payload() payload: TaskCommentCreatedSignal) {
    const { authorId, taskId } = payload;

    this.realTimeGateway.sinalizeTaskCommentCreated({ authorId, taskId });
  }

  @EventPattern(SIGNAL_KEYS.TASK_AUDIT_LOG)
  taskAuditLog(@Payload() payload: TaskAuditLogSignal) {
    const { authorId, action } = payload;

    this.realTimeGateway.sinalizeTaskAuditLog({ authorId, action });
  }
}
