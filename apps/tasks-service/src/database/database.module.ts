import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { getConfig } from 'src/shared/config/config.helper';
import { typeORMConfigOptions } from 'src/shared/modules-config/typeorm-config';

import { TaskEntity } from './orm/entities/task.entity';
import { CommentEntity } from './orm/entities/comment.entity';
import { UserTaskEntity } from './orm/entities/users-tasks.entity';
import { TaskAuditLogEntity } from './orm/entities/task-audit-logs.entity';

import { TasksRepository } from './orm/repositories/tasks.repository';
import { CommentsRepository } from './orm/repositories/comments.repository';
import { UsersTasksRepository } from './orm/repositories/users-tasks.repository';
import { TaskAuditLogsRepository } from './orm/repositories/task-audit-logs.repository';

import {
  COMMENTS_REPOSITORY,
  TASK_AUDIT_LOGS_REPOSITORY,
  TASKS_REPOSITORY,
  USERS_TASKS_REPOSITORY,
} from 'src/shared/constants/tokens';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const getConfigService = getConfig(configService);

        return typeORMConfigOptions(getConfigService);
      },
    }),
    TypeOrmModule.forFeature([
      TaskEntity,
      CommentEntity,
      UserTaskEntity,
      TaskAuditLogEntity,
    ]),
  ],
  providers: [
    { provide: TASKS_REPOSITORY, useClass: TasksRepository },
    { provide: COMMENTS_REPOSITORY, useClass: CommentsRepository },
    { provide: USERS_TASKS_REPOSITORY, useClass: UsersTasksRepository },
    { provide: TASK_AUDIT_LOGS_REPOSITORY, useClass: TaskAuditLogsRepository },
  ],
  exports: [
    TypeOrmModule,
    TASKS_REPOSITORY,
    COMMENTS_REPOSITORY,
    USERS_TASKS_REPOSITORY,
    TASK_AUDIT_LOGS_REPOSITORY,
  ],
})
export class DatabaseModule {}
