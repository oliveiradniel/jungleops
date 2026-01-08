import type { CreateCommentData } from '@/types/comment-data';

import type { ICommentsService } from '../contracts/icomments-service';
import type { HttpRequestConfig, IHttpClient } from '../contracts/ihttp-client';

import type {
  Pagination,
  TaskComment,
  ListCommentsWithUserDataPagination,
} from '@challenge/shared';

export class CommentsService implements ICommentsService {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  list(
    taskId: string,
    data: Pagination,
    config?: HttpRequestConfig,
  ): Promise<ListCommentsWithUserDataPagination> {
    const { page, size } = data;

    return this.httpClient.get<ListCommentsWithUserDataPagination>(
      `/tasks/${taskId}/comments`,
      {
        params: {
          page,
          size,
        },
        ...config,
      },
    );
  }

  create(
    taskId: string,
    data: CreateCommentData,
    config?: HttpRequestConfig,
  ): Promise<TaskComment> {
    const { userId, comment } = data;

    return this.httpClient.post<TaskComment>(
      `/tasks/${taskId}/comments`,
      { userId, comment },
      config,
    );
  }
}
