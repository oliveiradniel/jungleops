import { formatDateToBR, formatTermDateToBR } from '../utils/format-date-br';
import { priorityLabels, statusLabels } from '@/config/labels';

import type { Task } from '../entities/task';
import type {
  CreateTaskData as DomainCreateTaskData,
  UpdateTaskData as DomainUpdateTaskData,
} from '@/types/task-data';
import type { TaskPriority } from '../enums/TaskPriority';
import type { TaskStatus } from '../enums/TaskStatus';
import type {
  TaskWithCommentCount,
  CreateTaskData as PersistenceCreateTaskData,
  UpdateTaskData as PersistenceUpdateTaskData,
  ListTasksPagination,
} from '@challenge/shared';

export class TaskMapper {
  private static toDateOnly(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  static toDomain(task: TaskWithCommentCount): Task {
    const {
      id,
      title,
      description,
      priority,
      status,
      term,
      createdAt,
      commentsCount,
    } = task;

    return {
      id,
      title,
      description,
      priority: {
        value: priority,
        label: priorityLabels[priority as TaskPriority],
      },
      status: {
        value: status,
        label: statusLabels[status as TaskStatus],
      },
      term: formatTermDateToBR(term),
      createdAt: formatDateToBR(createdAt),
      commentsCount: commentsCount ?? 0,
    };
  }

  static toDomainList(
    data: ListTasksPagination,
  ): ListTasksPagination & { tasks: Task[] } {
    const tasksList = data.tasks.map((task) => TaskMapper.toDomain(task));

    return {
      ...data,
      tasks: tasksList,
    };
  }

  static toCreatePersistence(
    task: DomainCreateTaskData,
  ): Omit<PersistenceCreateTaskData, 'authorId'> {
    const { title, description, priority, status, term } = task;

    return {
      title,
      description,
      priority,
      status,
      term: TaskMapper.toDateOnly(term),
    };
  }

  static toUpdatePersistence(
    task: DomainUpdateTaskData,
  ): Omit<PersistenceUpdateTaskData, 'lastEditedBy'> {
    const { title, description, priority, status, term } = task;

    return {
      title,
      description,
      priority,
      status,
      term: term ? this.toDateOnly(term) : undefined,
    };
  }
}
