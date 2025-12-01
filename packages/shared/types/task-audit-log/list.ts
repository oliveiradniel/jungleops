import { UserWithoutPassword } from "entities";

export interface ListCreationTaskAuditLog {
  id: string;
  taskId: string;
  authorId: string;
  taskTitle: string;
  values: string;
  changedAt: Date;
}

export type ListCreationTaskAuditLogWithAuthorData = ListCreationTaskAuditLog & { authorData: UserWithoutPassword }

export interface ListDeletionTaskAuditLog {
  id: string;
  taskId: string;
  authorId: string;
  taskTitle: string;
  values: string;
  changedAt: Date;
}

export type ListDeletionTaskAuditLogWithAuthorData = ListDeletionTaskAuditLog & { authorData: UserWithoutPassword }

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
