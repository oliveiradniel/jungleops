import { TaskPriority, TaskStatus } from "../../enums";

interface BaseNotification {
  targetUserIds: string[];
}

export interface TaskCreatedNotification extends BaseNotification {
  author: {
    id: string;
    username: string;
  }
  task: {
    id: string;
    title: string;
    priority: TaskPriority;
  }
}

export interface TaskTitleUpdatedNotification {
  author: {
    id: string;
    username: string;
  }
  task: {
    id: string;
    oldTitle?: string;
    newTitle?: string;
    participantIds: string[];
  }
}

export interface TaskStatusUpdatedNotification {
  author: {
    id: string;
    username: string;
  }
  task: {
    id: string;
    title: string;
    oldStatus: TaskStatus;
    newStatus: TaskStatus;
    participantIds: string[];
  }
}

export interface TaskPriorityUpdatedNotification {
  author: {
    id: string;
    username: string;
  }
  task: {
    id: string;
    title: string;
    oldPriority: TaskPriority;
    newPriority: TaskPriority;
    participantIds: string[];
  }
}

export interface TaskTermUpdatedNotification {
  author: {
    id: string;
    username: string;
  }
  task: {
    id: string;
    title: string;
    oldTerm: string;
    newTerm: string;
    participantIds: string[];
  }
}

export interface TaskAssignedNotification {
  author: {
    id: string;
    username: string;
  }
  task: {
    id: string;
    title: string;
    priority: TaskPriority;
    addedParticipantIds: string[];
    participantIds: string[];
  }
}

export interface TaskUnassignedNotification {
  author: {
    id: string;
    username: string;
  }
  task: {
    id: string;
    title: string;
    removedParticipantIds: string[];
    participantIds: string[];
  }
}

export interface TaskDeletedNotification extends BaseNotification {
  author: {
    id: string;
    username: string;
  }
  task: {
    title: string;
    participantIds: string[];
  }
}

export interface TaskCommentCreatedNotification {
  author: {
    id: string;
    username: string;
  }
  task: {
    id: string;
    title: string;
    comment: string;
    participantIds: string[];
  }
}
