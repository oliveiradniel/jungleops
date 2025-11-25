import { TaskPriority, TaskStatus } from 'enums';

export interface CreateTaskData {
  title: string;
  authorId: string;
  description: string;
  term: Date;
  priority?: TaskPriority;
  status?: TaskStatus;
}
