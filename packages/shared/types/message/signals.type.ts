export interface TaskUpdatedSignal {
  authorId: string;
  task: {
    id: string;
    participantIds: string[];
  }
}

export interface TaskAuditLogSignal {
  authorId: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
}
