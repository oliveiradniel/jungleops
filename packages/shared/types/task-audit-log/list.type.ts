import { TaskWithCommentCount, UserWithoutPassword, TFieldName } from "../../entities";

export interface ListCreationTaskAuditLog {
  id: string;
  authorId: string;
  task: TaskWithCommentCount;
  createdAt: Date;
}

export type ListCreationTaskAuditLogWithAuthor = ListCreationTaskAuditLog & { author: UserWithoutPassword }

export interface ListUpdateTaskAuditLog {
  id: string;
  taskId: string;
  authorId: string;
  taskTitle: string;
  fieldName: TFieldName;
  oldValue: string | UserWithoutPassword[];
  newValue: string | UserWithoutPassword[];
  changedAt: Date;
}

export type ListUpdateTaskAuditLogWithAuthor = ListUpdateTaskAuditLog & { author: UserWithoutPassword }

export interface ListDeletionTaskAuditLog {
  id: string;
  authorId: string;
  task: TaskWithCommentCount;
  deletedAt: Date;
}

export type ListDeletionTaskAuditLogWithAuthor = ListDeletionTaskAuditLog & { author: UserWithoutPassword }
