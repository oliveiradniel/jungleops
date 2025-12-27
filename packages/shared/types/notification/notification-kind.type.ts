export type NotificationKind =
  | 'task.created'
  | 'task.updated'
  | 'task.title.updated'
  | 'task.status.updated'
  | 'task.priority.updated'
  | 'task.term.updated'
  | 'task.assigned'
  | 'task.unassigned'
  | 'task.deleted'
  | 'task.comment.created';
