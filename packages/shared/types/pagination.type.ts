import { TaskComment, TaskWithCommentCount, UserWithoutPassword } from '../entities';

export interface Pagination {
  page: number;
  size: number;
}

export type ListTasksPagination = {
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  tasks: TaskWithCommentCount[];
};

export type ListCommentsPagination = {
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  comments: TaskComment[];
};

export type CommentWithUserData = {
  id: string;
  taskId: string;
  userId: string;
  comment: string;
  createdAt: Date;
  user: UserWithoutPassword;
};

export type ListCommentsWithUserDataPagination = {
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  comments: CommentWithUserData[];
};
