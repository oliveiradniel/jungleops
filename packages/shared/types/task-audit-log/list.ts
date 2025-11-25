export interface ListCreationTaskAuditLog {
  id: string;
  taskId: string;
  userId: string;
  taskTitle: string;
  newValue: string;
  changedAt: Date;
}

export interface ListDeletionTaskAuditLog {
  id: string;
  userId: string;
  taskTitle: string;
  oldValue: string;
  changedAt: Date;
}

export interface ListUpdateTaskAuditLog {
  id: string;
  taskId: string;
  userId: string;
  taskTitle: string;
  fieldName: string;
  oldValue: string;
  newValue: string;
  changedAt: Date;
}
