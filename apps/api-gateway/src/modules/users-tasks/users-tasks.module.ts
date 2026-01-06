import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from '../users/users.module';

import { UsersTasksController } from './users-tasks.controller';

import { UsersTasksService } from './users-tasks.service';

@Module({
  imports: [HttpModule, UsersModule],
  controllers: [UsersTasksController],
  providers: [UsersTasksService],
  exports: [UsersTasksService],
})
export class UsersTasksModule {}
