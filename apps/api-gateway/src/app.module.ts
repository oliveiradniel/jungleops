import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from './modules/auth/auth.module';
import { CommentsModule } from './modules/comments/comments.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';
import { UsersTasksModule } from './modules/users-tasks/users-tasks.module';
import { TaskAuditLogsModule } from './modules/task-audit-logs/task-audit-logs.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { MessagingModule } from './messaging/messaging.module';

import { JwtAccessStrategy } from './modules/auth/strategies/jwt-access.strategy';
import { JwtRefreshStrategy } from './modules/auth/strategies/jwt-refresh.strategy';

import { configModuleOptions } from './shared/modules-config/config-module.config';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 1000,
          limit: 10,
        },
      ],
    }),
    AuthModule,
    TasksModule,
    CommentsModule,
    UsersModule,
    UsersTasksModule,
    TaskAuditLogsModule,
    NotificationsModule,
    MessagingModule,
  ],
  providers: [
    JwtAccessStrategy,
    JwtRefreshStrategy,
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
