import { TaskWithCommentCount } from "entities";
import { TaskPriority, TaskStatus } from "enums";

export type TasksList = {
  tasks: TaskWithCommentCount[];
  totalAll: number;
  totalFiltered: number;
  pagination: {
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  },
  facets: {
    status: {
      value: TaskStatus;
      count: number;
    }[],
    priority: {
      value: TaskPriority;
      count: number;
    }[],
  },
};
