import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MessagingModule } from './messaging/messaging.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { DatabaseModule } from './database/database.module';
import { CommentsModule } from './modules/comments/comments.module';
import { TaskAuditLogsModule } from './modules/task-audit-logs/task-audit-logs.module';

import { configModuleOptions } from './shared/modules-config/config-module.config';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    MessagingModule,
    DatabaseModule,
    TasksModule,
    CommentsModule,
    TaskAuditLogsModule,
  ],
})
export class AppModule {}
