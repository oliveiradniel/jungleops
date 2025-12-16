import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import type { Request } from 'express';

import { TasksService } from './tasks.service';

import { TaskIdParam } from 'src/shared/params/task-id.param';
import { PaginationQueryParam } from 'src/shared/queryParams/pagination.query-param';

import { UpdateTaskDTO } from './dtos/update-task.dto';
import { CreateTaskDTO } from './dtos/create-task.dto';

import { BadGatewayResponse } from 'src/shared/responses/bad-gateway.responde';
import { ListTasksOkResponse } from './responses/list-tasks-ok.response';
import { UnauthorizedResponse } from 'src/shared/responses/unauthorized.response';
import { NotFoundTaskResponse } from 'src/shared/responses/not-found-task.response';
import { TaskResponse } from './responses/task.response';
import { ConflictTaskResponse } from './responses/conflict-task-response copy';
import { ThrottlerResponse } from 'src/shared/responses/throttler.response';
import { BadRequestCreateTaskResponse } from './responses/bad-request-create-task.response';

import { ListTasksPagination, Task } from '@challenge/shared';

@ApiBearerAuth()
@ApiBadGatewayResponse({
  description:
    'The gateway received an invalid response or no response from a microservice.',
  type: BadGatewayResponse,
})
@ApiUnauthorizedResponse({
  description: 'Invalid token or missing token.',
  type: UnauthorizedResponse,
})
@ApiResponse({
  status: 429,
  description:
    'Too many requests. The client has exceeded the rate limit of 10 requests per second.',
  type: ThrottlerResponse,
})
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOkResponse({
    description: 'Returns the task matching the provided ID.',
    type: TaskResponse,
  })
  @ApiNotFoundResponse({
    description: 'No task found with the provided ID.',
    type: NotFoundTaskResponse,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':taskId')
  async findById(@Param() params: TaskIdParam): Promise<Task> {
    const { taskId } = params;

    return this.tasksService.findById(taskId);
  }

  @ApiOkResponse({
    description: 'List all tasks.',
    type: ListTasksOkResponse,
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async list(
    @Query() queryParams: PaginationQueryParam,
  ): Promise<ListTasksPagination> {
    const { page, size } = queryParams;

    return this.tasksService.list({ page, size });
  }

  @Get('list/user')
  async listTasksByUserId(@Req() request: Request) {
    const userId = request.user?.userId as string;

    return this.tasksService.listTasksByUserId(userId);
  }

  @ApiCreatedResponse({
    description: 'Task successfully created.',
    example: {
      id: '7e8e7fad-a283-45a5-9206-6a8e5adf7cbc',
      title: 'Refatorar módulo de co2m3ent22á323r2i3os2 15153212',
      description:
        'Melhorar legibilidade, dividir arquivos grandes e remover trechos duplicados.',
      term: '2025-11-18T20:55:23.066Z',
      priority: 'URGENT',
      status: 'IN_PROGRESS',
      comments: [],
      createdAt: '2025-11-18T20:55:23.077Z',
    },
  })
  @ApiBadRequestResponse({
    description: 'The user did not send an title, description or term.',
    type: BadRequestCreateTaskResponse,
  })
  @ApiConflictResponse({
    description: 'A task with this title already exists.',
    type: ConflictTaskResponse,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() createTaskDTO: CreateTaskDTO,
    @Req() request: Request,
  ): Promise<Task> {
    const userId = request.user?.userId!;

    const { title, description, term, priority, status } = createTaskDTO;

    return this.tasksService.create({
      authorId: userId,
      title,
      description,
      term,
      priority,
      status,
    });
  }

  @ApiNoContentResponse({
    description: 'Task successfully updated. No content is returned.',
  })
  @ApiConflictResponse({
    description: 'A task with this title already exists.',
    type: ConflictTaskResponse,
  })
  @ApiNotFoundResponse({
    description: 'No task found with the provided ID.',
    type: NotFoundTaskResponse,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':taskId')
  async update(
    @Param() params: TaskIdParam,
    @Body() updateTaskDTO: UpdateTaskDTO,
    @Req() request: Request,
  ): Promise<void> {
    const userId = request.user?.userId!;
    const { taskId } = params;
    const { userIds, title, description, term, priority, status } =
      updateTaskDTO;

    await this.tasksService.update(taskId, {
      lastEditedBy: userId,
      userIds,
      title,
      description,
      term,
      priority,
      status,
    });
  }

  @ApiNoContentResponse({
    description: 'Task successfully updated. No content is returned.',
  })
  @ApiNotFoundResponse({
    description: 'No task found with the provided ID.',
    type: NotFoundTaskResponse,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':taskId')
  async delete(
    @Param() params: TaskIdParam,
    @Req() request: Request,
  ): Promise<void> {
    const { taskId } = params;
    const userId = request.user?.userId;

    await this.tasksService.delete(taskId, userId!);
  }
}
