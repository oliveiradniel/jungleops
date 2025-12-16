import { FieldName } from 'entities';

import { TaskPriority, TaskStatus } from 'enums';

export interface ChangedField {
  fieldName: FieldName;
  dirty: boolean;
  newValue: string;
  oldValue: string;
}

export interface UpdatedTaskNotificationPayload {
  taskId: string;
  changedFields: ChangedField[];
  participantIds: string[];
  newUserIds: number;
  updatedBy: string;
  updatedAt: Date;
  fullTask: {
    id: string;
    authorId: string;
    lastEditedBy: string;
    title: string;
    description: string;
    term: string;
    priority: TaskPriority;
    status: TaskStatus;
  };
}

export interface UpdatedTaskStatusNotificationPayload {
  participantIds: string[];
  lastEditedBy: string;
  title: string;
  status: TaskStatus;
}

export interface UpdatedTaskPriorityNotificationPayload {
  participantIds: string[];
  lastEditedBy: string;
  title: string;
  priority: TaskPriority;
}

export interface DeletedTaskNotificationPayload {
  title: string;
  deletedBy: string;
}

export interface AssignedToTaskNotificationPayload {
  newUserIds: string[];
  fullTask: {
    id: string;
    authorId: string;
    lastEditedBy: string;
    title: string;
    description: string;
    term: string;
    priority: TaskPriority;
    status: TaskStatus;
  };
}

export interface NewCommentNotificationPayload {
  taskId: string;
  taskTitle: string;
  comment: {
    id: string;
    text: string;
    authorId: string;
    createdAt: Date;
  };
  participantIds: string[];
}
