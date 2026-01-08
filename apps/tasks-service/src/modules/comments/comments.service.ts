import { Inject, Injectable } from '@nestjs/common';

import { TasksService } from '../tasks/tasks.service';
import { UsersTasksService } from '../users-tasks/users-tasks.service';
import { EventsPublisherService } from 'src/messaging/events-publisher.service';
import { SignalsPublisherService } from 'src/messaging/signals-publisher.service';

import type { ICommentsRepository } from 'src/database/contracts/comments-repository.contract';

import type {
  CreateCommentData,
  Pagination,
  TaskComment,
  ListCommentsPagination,
} from '@challenge/shared';

import { COMMENTS_REPOSITORY } from 'src/shared/constants/tokens';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(COMMENTS_REPOSITORY)
    private readonly commentsRepository: ICommentsRepository,
    private readonly usersTasksService: UsersTasksService,
    private readonly tasksService: TasksService,
    private readonly eventsPublisherService: EventsPublisherService,
    private readonly signalsPublisherService: SignalsPublisherService,
  ) {}

  async list(
    taskId: string,
    pagination: Pagination,
  ): Promise<ListCommentsPagination> {
    const { page, size } = pagination;

    return this.commentsRepository.list(taskId, { page, size });
  }

  async create(taskId: string, data: CreateCommentData): Promise<TaskComment> {
    const { userId, comment } = data;

    const { title } = await this.tasksService.verifyTaskExists(taskId);

    const assignedUserIds =
      await this.usersTasksService.listUserIdsByTaskId(taskId);

    const createdComment = await this.commentsRepository.create(taskId, {
      userId,
      comment,
    });

    this.eventsPublisherService.taskCommentCreated({
      authorId: userId,
      task: {
        id: taskId,
        title: title,
        participantIds: assignedUserIds,
        comment: comment,
      },
    });

    this.signalsPublisherService.taskCommentCreated({
      authorId: userId,
      task: {
        id: taskId,
        participantIds: assignedUserIds,
      },
    });

    return createdComment;
  }
}
