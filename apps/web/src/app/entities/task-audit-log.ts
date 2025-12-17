import type { Task } from './task';
import type { UserWithoutPassword } from '@challenge/shared';

export interface AuditLogOfTaskCreation {
  id: string;
  task: Task;
  author: UserWithoutPassword;
  createdAt: string;
}

export interface AuditLogOfTaskUpdate {
  id: string;
  task: {
    id: string;
    title: string;
  };
  author: UserWithoutPassword;
  fieldName: string;
  oldValue: string | UserWithoutPassword[];
  newValue: string | UserWithoutPassword[];
  changedAt: string;
}

export interface AuditLogOfTaskDeletion {
  id: string;
  task: Task;
  author: UserWithoutPassword;
  deletedAt: string;
}
