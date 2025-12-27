import { TaskPriority } from '../enums/task-priority.js';
import { TaskStatus } from '../enums/task-status.js';
import { TaskComment } from './comment.entity.js';
import { UserWithoutPassword } from './user.entity.js';

export interface Task {
  id: string;
  authorId: string;
  lastEditedBy: string;
  title: string;
  description: string;
  term: string;
  priority: TaskPriority;
  status: TaskStatus;
  comments: TaskComment[];
  createdAt: Date;
}

export interface TaskWithParticipants {
  id: string;
  authorId: string;
  lastEditedBy: string;
  title: string;
  description: string;
  term: string;
  priority: TaskPriority;
  status: TaskStatus;
  comments: TaskComment[];
  createdAt: Date;
  participants: UserWithoutPassword[];
}

export interface TaskWithCommentCount {
  id: string;
  title: string;
  description: string;
  term: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: Date;
  commentsCount: number;
}
