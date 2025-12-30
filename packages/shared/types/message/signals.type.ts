export interface TaskUpdatedSignal {
  authorId: string;
  task: {
    id: string;
    participantIds: string[];
  }
}

export interface TaskCommentCreatedSignal {
  authorId: string;
  taskId: string;
}

export interface TaskAuditLogSignal {
  authorId: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
}
