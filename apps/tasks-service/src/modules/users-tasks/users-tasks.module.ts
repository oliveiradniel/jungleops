import { Module } from '@nestjs/common';
import { UsersTasksController } from './users-tasks.controller';
import { UsersTasksService } from './users-tasks.service';

@Module({
  controllers: [UsersTasksController],
  providers: [UsersTasksService],
  exports: [UsersTasksService],
})
export class UsersTasksModule {}
