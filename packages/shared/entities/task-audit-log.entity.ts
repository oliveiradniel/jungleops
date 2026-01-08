export enum FieldName {
  TITLE = 'title',
  DESCRIPTION = 'description',
  TERM = 'term',
  PRIORITY = 'priority',
  STATUS = 'status',
  USER_IDS = 'userIds',
}

export type TFieldName = 'title' | 'description' | 'term' | 'priority' | 'status' | 'userIds';

export enum AuditAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}
export type TAuditAction = 'CREATE' | 'UPDATE' | 'DELETE';


export interface TaskAuditLog {
  id: string;
  taskId: string;
  authorId: string;
  taskTitle: string;
  fieldName: FieldName | null;
  action: TAuditAction;
  oldValue: string | null;
  newValue: string | null;
  changedAt: Date;
}
