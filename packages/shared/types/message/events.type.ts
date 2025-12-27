import { Task } from "../../entities";
import { TaskPriority } from "../../enums";

export interface TaskCreatedEvent {
  task: {
    id: string;
    title: string;
    priority: TaskPriority;
  }
  authorId: string;
}

export interface TaskUpdatedEvent {
  authorId: string;
  task: {
    id: string;
    removedParticipantIds: string[]
    addedParticipantIds: string[];
    participantIds: string[];
  }
  oldData: Pick<Task, 'title' | 'status' | 'priority' | 'term'>;
  newData: Partial<Task>;
}

export interface TaskCommentCreatedEvent {
  authorId: string;
  task: {
    id: string;
    title: string;
    participantIds: string[];
    comment: string;
  }
}

export interface TaskDeletedEvent {
  authorId: string;
  task: {
    id: string;
    title: string;
    participantIds: string[];
  }
}
