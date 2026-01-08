import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';

import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CommentsService } from './comments.service';

import { TaskIdParam } from 'src/shared/params/task-id.param';
import { PaginationQueryParam } from 'src/shared/queryParams/pagination.query-param';
import { CreateCommentDTO } from './dtos/create-comment.dto';
import { BadGatewayResponse } from 'src/shared/responses/bad-gateway.responde';
import { UnauthorizedResponse } from 'src/shared/responses/unauthorized.response';
import { NotFoundTaskResponse } from 'src/shared/responses/not-found-task.response';
import { ListCommentsOkResponse } from './responses/list-comments-ok.response';
import { BadRequestCreateCommentResponse } from './responses/bad-request-create-commentresponse';
import { ThrottlerResponse } from 'src/shared/responses/throttler.response';

import {
  TaskComment,
  ListCommentsWithUserDataPagination,
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
@ApiNotFoundResponse({
  description: 'No task found with the provided ID.',
  type: NotFoundTaskResponse,
})
@ApiResponse({
  status: 429,
  description:
    'Too many requests. The client has exceeded the rate limit of 10 requests per second.',
  type: ThrottlerResponse,
})
@Controller('tasks')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOkResponse({
    description:
      'Lists all comments for the specified task, including pagination details.',
    type: ListCommentsOkResponse,
  })
  @HttpCode(HttpStatus.OK)
  @Get(':taskId/comments')
  async list(
    @Param() params: TaskIdParam,
    @Query() queryParams: PaginationQueryParam,
  ): Promise<ListCommentsWithUserDataPagination> {
    const { taskId } = params;
    const { page, size } = queryParams;

    return this.commentsService.list(taskId, { page, size });
  }

  @ApiOkResponse({
    description: 'Comment successfully created.',
    example: {
      id: '61cfbf8b-2ac2-486c-ab00-14d9d67a6eee',
      taskId: '68254159-63fe-481a-9841-8bca49cb53bc',
      userId: 'e273d906-dc4b-4609-9fb7-b41efe35a35e',
      comment:
        'Boa oportunidade para testar componentes acessíveis e ver como eles se comportam em diferentes navegadores.',
      createdAt: '2025-11-13T01:11:57.284Z',
    },
  })
  @ApiBadRequestResponse({
    description: 'The user did not send an userId or comment.',
    type: BadRequestCreateCommentResponse,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post(':taskId/comments')
  async create(
    @Param() params: TaskIdParam,
    @Body() createCommentDTO: CreateCommentDTO,
  ): Promise<TaskComment> {
    const { taskId } = params;
    const { userId, comment } = createCommentDTO;

    return this.commentsService.create(taskId, { userId, comment });
  }
}
