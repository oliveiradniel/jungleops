import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { TasksController } from './tasks.controller';

import { TasksService } from './tasks.service';

@Module({
  imports: [HttpModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
