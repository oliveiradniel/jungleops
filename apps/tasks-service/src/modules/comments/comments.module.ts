import { Module } from '@nestjs/common';

import { TasksModule } from '../tasks/tasks.module';
import { UsersTasksModule } from '../users-tasks/users-tasks.module';

import { CommentsController } from './comments.controller';

import { CommentsService } from './comments.service';

@Module({
  imports: [TasksModule, UsersTasksModule],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
