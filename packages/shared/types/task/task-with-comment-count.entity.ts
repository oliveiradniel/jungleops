import { TaskPriority, TaskStatus } from 'enums';

export interface TaskWithCommentCount {
  id: string;
  title: string;
  description: string;
  term: Date;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: Date;
  commentsCount: number;
}
