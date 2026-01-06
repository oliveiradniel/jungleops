import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Req,
} from '@nestjs/common';

import {
  ApiBadGatewayResponse,
  ApiBearerAuth,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Request } from 'express';

import { TaskAuditLogsService } from './task-audit-logs.service';

import { BadGatewayResponse } from 'src/shared/responses/bad-gateway.responde';
import { UnauthorizedResponse } from 'src/shared/responses/unauthorized.response';
import { ThrottlerResponse } from 'src/shared/responses/throttler.response';
import { ListCreationTaskAuditLogOkResponse } from './responses/list-creation-task-audit-log-ok.response';
import { ListUpdateTaskAuditLogOkResponse } from './responses/list-update-task-audit-log-ok.response';
import { ListDeletionTaskAuditLogOkResponse } from './responses/list-deletion-task-audit-log-ok.response';
import { NotFoundTaskAuditLogResponse } from './responses/not-found-task-audit-log.response';

import {
  ListCreationTaskAuditLogWithAuthor,
  ListDeletionTaskAuditLogWithAuthor,
  ListUpdateTaskAuditLogWithAuthor,
} from '@challenge/shared';

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
@Controller('task-audit-logs')
export class TaskAuditLogsController {
  constructor(private readonly taskAuditLogsService: TaskAuditLogsService) {}

  @ApiOkResponse({
    description: 'List all creation task audit logs.',
    type: ListCreationTaskAuditLogOkResponse,
  })
  @HttpCode(HttpStatus.OK)
  @Get('creation')
  listTaskCreationAuditLog(): Promise<ListCreationTaskAuditLogWithAuthor[]> {
    return this.taskAuditLogsService.listTaskCreationAuditLog();
  }

  @ApiOkResponse({
    description: 'List all update task audit logs.',
    type: ListUpdateTaskAuditLogOkResponse,
  })
  @HttpCode(HttpStatus.OK)
  @Get('update')
  listTaskUpdateAuditLog(): Promise<ListUpdateTaskAuditLogWithAuthor[]> {
    return this.taskAuditLogsService.listTaskUpdateAuditLog();
  }

  @ApiOkResponse({
    description: 'List all deletion task audit logs.',
    type: ListDeletionTaskAuditLogOkResponse,
  })
  @HttpCode(HttpStatus.OK)
  @Get('deletion')
  listTaskDeletionAuditLog(): Promise<ListDeletionTaskAuditLogWithAuthor[]> {
    return this.taskAuditLogsService.listTaskDeletionAuditLog();
  }

  @ApiNoContentResponse({
    description: 'Task successfully deleted. No content is returned.',
  })
  @ApiNotFoundResponse({
    description: 'No task audit log found with the provided ID.',
    type: NotFoundTaskAuditLogResponse,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  delete(@Param('id') id: string, @Req() request: Request): Promise<void> {
    const userId = request.user?.userId;

    return this.taskAuditLogsService.delete(id, userId!);
  }
}
