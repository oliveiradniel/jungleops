import type { TaskPriority, TaskStatus } from '@challenge/shared';

export interface Task {
  id: string;
  title: string;
  description: string;
  term: string;
  priority: {
    value: TaskPriority;
    label: string;
  };
  status: {
    value: TaskStatus;
    label: string;
  };
  createdAt: string;
  commentsCount: number;
}
