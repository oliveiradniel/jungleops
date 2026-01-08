import type { HttpRequestConfig } from './ihttp-client';
import type { CreateCommentData } from '@/types/comment-data';

import type {
  TaskComment,
  ListCommentsWithUserDataPagination,
  Pagination,
} from '@challenge/shared';

export abstract class ICommentsService {
  abstract list(
    taskId: string,
    data: Pagination,
    config?: HttpRequestConfig,
  ): Promise<ListCommentsWithUserDataPagination>;
  abstract create(
    taskId: string,
    data: CreateCommentData,
    config?: HttpRequestConfig,
  ): Promise<TaskComment>;
}
