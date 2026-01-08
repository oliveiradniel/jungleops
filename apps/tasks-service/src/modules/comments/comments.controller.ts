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

import { CommentsService } from './comments.service';

import {
  CreateCommentData,
  Pagination,
  TaskComment,
  ListCommentsPagination,
} from '@challenge/shared';

@Controller('tasks')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @HttpCode(HttpStatus.OK)
  @Get(':taskId/comments')
  list(
    @Param('taskId') taskId: string,
    @Query() queryParams: Pagination,
  ): Promise<ListCommentsPagination> {
    const { page, size } = queryParams;

    return this.commentsService.list(taskId, { page, size });
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(':taskId/comments')
  create(
    @Param('taskId') taskId: string,
    @Body() createCommentData: CreateCommentData,
  ): Promise<TaskComment> {
    const { userId, comment } = createCommentData;

    return this.commentsService.create(taskId, { userId, comment });
  }
}
