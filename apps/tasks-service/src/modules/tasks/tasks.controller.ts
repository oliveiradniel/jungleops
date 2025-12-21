import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { TasksService } from './tasks.service';

import type {
  CreateTaskData,
  UpdateTaskData,
  Task,
  TaskWithCommentCount,
  TasksFilters,
  TasksList,
} from '@challenge/shared';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @HttpCode(HttpStatus.OK)
  @Get(':taskId')
  findById(@Param('taskId') taskId: string): Promise<Task> {
    return this.tasksService.findById(taskId);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  list(@Query() queryParams: TasksFilters): Promise<TasksList> {
    const { page, size, status, priority } = queryParams;

    return this.tasksService.list({ page, size, status, priority });
  }

  @Get('user/:userId')
  listTasksByUserId(
    @Param('userId') userId: string,
  ): Promise<TaskWithCommentCount[]> {
    return this.tasksService.listTasksByUserId(userId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createTaskData: CreateTaskData): Promise<Task> {
    const { authorId, title, description, term, priority, status } =
      createTaskData;

    return this.tasksService.create({
      authorId,
      title,
      description,
      term,
      priority,
      status,
    });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':taskId')
  async update(
    @Param('taskId') taskId: string,
    @Body() updateTaskData: UpdateTaskData,
  ): Promise<void> {
    const {
      lastEditedBy,
      userIds,
      title,
      description,
      term,
      priority,
      status,
    } = updateTaskData;

    await this.tasksService.update(taskId, {
      lastEditedBy,
      userIds,
      title,
      description,
      term,
      priority,
      status,
    });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':taskId')
  delete(
    @Param('taskId') taskId: string,
    @Headers('deleted-by') deletedBy: string,
  ): Promise<void> {
    return this.tasksService.delete(taskId, deletedBy);
  }
}
