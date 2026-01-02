import { DataSourceOptions } from 'typeorm';

import { join } from 'path';

import { getConfig } from '../config/config.helper';

import { TaskEntity } from 'src/database/orm/entities/task.entity';
import { CommentEntity } from 'src/database/orm/entities/comment.entity';
import { UserTaskEntity } from 'src/database/orm/entities/users-tasks.entity';
import { TaskAuditLogEntity } from 'src/database/orm/entities/task-audit-logs.entity';

export function typeORMConfigOptions(
  getConfigService: ReturnType<typeof getConfig>,
): DataSourceOptions {
  return {
    type: 'postgres',
    host: getConfigService.DB_TASKS_SERVICE_HOST,
    port: getConfigService.DB_TASKS_SERVICE_PORT,
    username: getConfigService.DB_TASKS_SERVICE_USER,
    password: getConfigService.DB_TASKS_SERVICE_PASSWORD,
    database: getConfigService.DB_TASKS_SERVICE_NAME,
    synchronize: false,
    entities: [TaskEntity, CommentEntity, UserTaskEntity, TaskAuditLogEntity],
    migrations: [join(__dirname, '/orm/migrations/*.{ts,js}')],
  };
}
