import { Module } from '@nestjs/common';

import { UsersTasksModule } from '../users-tasks/users-tasks.module';

import { TasksController } from './tasks.controller';

import { TasksService } from './tasks.service';
import { TaskAuditLogsService } from '../task-audit-logs/task-audit-logs.service';

import { UsersTasksRepository } from 'src/database/orm/repositories/users-tasks.repository';

import { USERS_TASKS_REPOSITORY } from 'src/shared/constants/tokens';

@Module({
  imports: [UsersTasksModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    TaskAuditLogsService,
    { provide: USERS_TASKS_REPOSITORY, useClass: UsersTasksRepository },
  ],
  exports: [TasksService],
})
export class TasksModule {}
