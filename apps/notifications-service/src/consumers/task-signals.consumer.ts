import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { RealTimeGateway } from 'src/realtime/realtime.gateway';

import {
  SIGNAL_KEYS,
  TaskAuditLogSignal,
  TaskUpdatedSignal,
} from '@challenge/shared';

@Controller()
export class TaskSignalsConsumer {
  constructor(private readonly realTimeGateway: RealTimeGateway) {}

  @EventPattern(SIGNAL_KEYS.TASK_UPDATED)
  taskUpdated(@Payload() payload: TaskUpdatedSignal) {
    const { authorId, task } = payload;

    this.realTimeGateway.sinalizeTaskUpdated({ authorId, task });
  }

  @EventPattern(SIGNAL_KEYS.TASK_AUDIT_LOG)
  taskAuditLog(@Payload() payload: TaskAuditLogSignal) {
    const { authorId, action } = payload;

    this.realTimeGateway.sinalizeTaskAuditLog({ authorId, action });
  }
}
