// DOMAIN EVENTS
export const DOMAIN_EVENT_KEYS = {
  TASK_CREATED: 'task.created.domain',
  TASK_UPDATED: 'task.updated.domain',
  TASK_DELETED: 'task.deleted.domain',
  TASK_COMMENT_CREATED: 'task.comment.created.domain',
} as const;

// DOMAIN SIGNALS
export const DOMAIN_SIGNAL_KEYS = {
  TASK_UPDATED: 'task.updated.domain.signal',
  TASK_COMMENT_CREATED: 'task.comment.created.domain.signal',
  TASK_AUDIT_LOG: 'task.audit-log.domain.signal',
} as const;

// INTEGRATION SIGNALS
export const SIGNAL_KEYS = {
  TASK_UPDATED: 'task.updated.signal',
  TASK_COMMENT_CREATED: 'task.comment.created.signal',
  TASK_AUDIT_LOG: 'task-audit-log.signal',
} as const;


export const EVENT_KEYS = {
  TASK_CREATED: 'notification.task.created',
  TASK_TITLE_UPDATED: 'notification.task-title.updated',
  TASK_STATUS_UPDATED: 'notification.task-status.updated',
  TASK_PRIORITY_UPDATED: 'notification.task-priority.updated',
  TASK_TERM_UPDATED: 'notification.task-term.updated',
  TASK_ASSIGNED: 'notification.task.assigned',
  TASK_UNASSIGNED: 'notification.task.unassigned',
  TASK_DELETED: 'notification.task.deleted',
  TASK_COMMENT_CREATED: 'notification.task.comment.created',
} as const;

// : => FRONT END NAMESPACE
export const SOCKET_EVENT_KEYS = {
  TASK_CREATED: 'task:created',
  TASK_TITLE_UPDATED: 'task:title:updated',
  TASK_STATUS_UPDATED: 'task:status:updated',
  TASK_PRIORITY_UPDATED: 'task:priority:updated',
  TASK_TERM_UPDATED: 'task:term:updated',
  TASK_ASSIGNED: 'task:assigned',
  TASK_UNASSIGNED: 'task:unassigned',
  TASK_DELETED: 'task:deleted',
  TASK_COMMENT_CREATED: 'task:comment:created',
} as const;

export const SOCKET_SIGNAL_KEYS = {
  TASK_UPDATED: 'task:updated:signal',
  TASK_COMMENT_CREATED: 'task:comment:created:signal',
  TASK_AUDIT_LOG: 'task-audit-log:signal',
} as const;
