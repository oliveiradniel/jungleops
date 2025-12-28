import { Module } from '@nestjs/common';

import { TaskAuditLogsController } from './task-audit-logs.controller';

import { TaskAuditLogsService } from './task-audit-logs.service';

@Module({
  controllers: [TaskAuditLogsController],
  providers: [TaskAuditLogsService],
})
export class TaskAuditLogsModule {}
