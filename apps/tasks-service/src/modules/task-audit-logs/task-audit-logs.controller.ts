import {
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';

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
    return this.taskAuditLogsService.listTaskUpdateAuditLog();
  }

  @HttpCode(HttpStatus.OK)
  @Get('deletion')
  listTaskDeletionAuditLog(): Promise<ListDeletionTaskAuditLog[]> {
    return this.taskAuditLogsService.listTaskDeletionAuditLog();
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Headers('deleted-by') deletedBy: string,
  ) {
    await this.taskAuditLogsService.delete(id, deletedBy);
  }
}
