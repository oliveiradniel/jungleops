import { useContext } from 'react';
import { TaskAuditLogContext } from './task-audit-log-context';

export function useTaskAuditLog() {
  const ctxValue = useContext(TaskAuditLogContext);

  if (!ctxValue) {
    throw new Error(`'useTaskAuditLog' should be used inside a TaskAuditLog.`);
  }

  return ctxValue;
}
