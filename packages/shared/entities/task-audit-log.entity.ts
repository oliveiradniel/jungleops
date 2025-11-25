export enum FieldName {
  TITLE = 'title',
  DESCRIPTION = 'description',
  TERM = 'term',
  PRIORITY = 'priority',
  STATUS = 'status',
  USER_IDS = 'userIds',
}

export enum AuditAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export interface TaskAuditLog {
  id: string;
  taskId: string;
  userId: string;
  taskTitle: string;
  fieldName: FieldName | null;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  oldValue: string | null;
  newValue: string | null;
  changedAt: Date;
}
