import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { TaskAuditLogGateway } from 'src/gateway/task-audit-log.gateway';

import { ActionPayload } from '@challenge/shared';

@Controller()
export class TaskAuditLogListenerController {
  constructor(private readonly taskAuditLogGateway: TaskAuditLogGateway) {}

  @EventPattern('task-audit-log.changed')
  onTaskAuditLogCreated({ action }: ActionPayload) {
    this.taskAuditLogGateway.notifyChangedTaskAuditLog({
      action,
    });
  }
}
