import { TaskPriority, TaskStatus } from '../../enums';

export interface CreateTaskData {
  title: string;
  authorId: string;
  description: string;
  term: string;
  priority: TaskPriority;
  status: TaskStatus;
}
