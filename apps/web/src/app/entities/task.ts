import type { TaskPriority } from '../enums/TaskPriority';
import type { TaskStatus } from '../enums/TaskStatus';

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
