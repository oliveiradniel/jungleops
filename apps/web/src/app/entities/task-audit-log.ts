import type { Task } from './task';
import type { FieldName, UserWithoutPassword } from '@challenge/shared';

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
  fieldName: {
    value: FieldName;
    label: string;
  };
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
