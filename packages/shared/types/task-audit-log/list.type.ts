import { Task, UserWithoutPassword } from "entities";

export interface ListCreationTaskAuditLog {
  id: string;
  authorId: string;
  task: Task;
  createdAt: Date;
}

export type ListCreationTaskAuditLogWithAuthorData = ListCreationTaskAuditLog & { authorData: UserWithoutPassword }

export interface ListUpdateTaskAuditLog {
  id: string;
  taskId: string;
  authorId: string;
  taskTitle: string;
  fieldName: string;
  oldValue: string | UserWithoutPassword[];
  newValue: string | UserWithoutPassword[];
  changedAt: Date;
}

export type ListUpdateTaskAuditLogWithAuthorData = ListUpdateTaskAuditLog & { authorData: UserWithoutPassword }

export interface ListDeletionTaskAuditLog {
  id: string;
  authorId: string;
  task: string;
  deletedAt: Date;
}

export type ListDeletionTaskAuditLogWithAuthorData = ListDeletionTaskAuditLog & { authorData: UserWithoutPassword }
