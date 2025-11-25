import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { TaskAuditLogsService } from './task-audit-logs.service';

import {
  ListCreationTaskAuditLog,
  ListDeletionTaskAuditLog,
  ListUpdateTaskAuditLog,
  TaskAuditLog,
} from '@challenge/shared';

@Controller('task-audit-logs')
export class TaskAuditLogsController {
  constructor(private readonly taskAuditLogsService: TaskAuditLogsService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  list(): Promise<TaskAuditLog[]> {
    return this.taskAuditLogsService.list();
  }

  @HttpCode(HttpStatus.OK)
  @Get('creation')
  listTaskCreationAuditLog(): Promise<ListCreationTaskAuditLog[]> {
    return this.taskAuditLogsService.listTaskCreationAuditLog();
  }

  @HttpCode(HttpStatus.OK)
  @Get('update')
  listTaskUpdateAuditLog(): Promise<ListUpdateTaskAuditLog[]> {
    return this.taskAuditLogsService.listtaskUpdateAuditLog();
  }

  @HttpCode(HttpStatus.OK)
  @Get('deletion')
  listTaskDeletionAuditLog(): Promise<ListDeletionTaskAuditLog[]> {
    return this.taskAuditLogsService.listTaskDeletionAuditLog();
  }
}
