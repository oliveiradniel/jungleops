import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from '../users/users.module';

import { TaskAuditLogsController } from './task-audit-logs.controller';

import { TaskAuditLogsService } from './task-audit-logs.service';

@Module({
  imports: [HttpModule, UsersModule],
  controllers: [TaskAuditLogsController],
  providers: [TaskAuditLogsService],
})
export class TaskAuditLogsModule {}
