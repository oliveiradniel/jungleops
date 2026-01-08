import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UsersService } from '../users/users.service';

import { firstValueFrom } from 'rxjs';
import { getConfig } from 'src/shared/config/config.helper';

import {
  CommentWithUserData,
  CreateCommentData,
  ListCommentsPagination,
  ListCommentsWithUserDataPagination,
  Pagination,
  TaskComment,
} from '@challenge/shared';

@Injectable()
export class CommentsService {
  private readonly baseURL: string;

  constructor(
    private readonly httpService: HttpService,
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    this.baseURL = getConfig(configService).TASKS_SERVICE_BASE_URL;
  }

  async list(
    taskId: string,
    dataToPagination: Pagination,
  ): Promise<ListCommentsWithUserDataPagination> {
    const { page, size } = dataToPagination;

    const { data } = await firstValueFrom(
      this.httpService.get<ListCommentsPagination, { params: Pagination }>(
        `${this.baseURL}/${taskId}/comments`,
        {
          params: {
            page,
            size,
          },
        },
      ),
    );

    const { comments } = data;

    const userIds = comments.map((comment) => comment.userId as string);

    const users = await this.usersService.findUsers(userIds);
    const usersMap = new Map(users.map((user) => [user.id, user]));

    const enrichedComments: CommentWithUserData[] =
      comments.map<CommentWithUserData>((comment) => ({
        ...comment,
        user: usersMap.get(comment.userId)!,
      }));

    return {
      comments: enrichedComments,
      total: data.total,
      totalPages: data.totalPages,
      hasNext: data.hasNext,
      hasPrevious: data.hasPrevious,
    };
  }

  async create(
    taskId: string,
    dataToCreate: CreateCommentData,
  ): Promise<TaskComment> {
    const { userId, comment } = dataToCreate;

    const { data } = await firstValueFrom(
      this.httpService.post<TaskComment, CreateCommentData>(
        `${this.baseURL}/${taskId}/comments`,
        { userId, comment },
      ),
    );

    return data;
  }
}
