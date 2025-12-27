import { TaskPriority, TaskStatus } from '../../enums';

export type UpdateTaskData = {
  title?: string;
  lastEditedBy: string;
  description?: string;
  term?: string;
  priority?: TaskPriority;
  status?: TaskStatus;
  userIds?: string[];
};
