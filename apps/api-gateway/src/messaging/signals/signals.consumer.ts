import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { SignalsPublisher } from './signals.publisher';

import {
  DOMAIN_SIGNAL_KEYS,
  TaskAuditLogSignal,
  TaskCommentCreatedSignal,
  TaskUpdatedSignal,
} from '@challenge/shared';

@Controller()
export class SignalsConsumer {
  constructor(private readonly signalsPublisher: SignalsPublisher) {}

  @EventPattern(DOMAIN_SIGNAL_KEYS.TASK_UPDATED)
  taskUpdated(@Payload() payload: TaskUpdatedSignal) {
    this.signalsPublisher.handleTaskUpdated(payload);
  }

  @EventPattern(DOMAIN_SIGNAL_KEYS.TASK_COMMENT_CREATED)
  taskCommentCreated(@Payload() payload: TaskCommentCreatedSignal) {
    this.signalsPublisher.handleTaskCommentCreated(payload);
  }

  @EventPattern(DOMAIN_SIGNAL_KEYS.TASK_AUDIT_LOG)
  taskAuditLog(@Payload() payload: TaskAuditLogSignal) {
    this.signalsPublisher.handleTaskAuditLog(payload);
  }
}
