import { AuditAction, FieldName } from '@challenge/shared';

export interface CreateTaskAuditLogData {
  action: AuditAction;
  taskId: string;
  userId: string;
  taskTitle: string;
  oldValue: string | null;
  newValue: string | null;
  fieldName: FieldName | null;
}
