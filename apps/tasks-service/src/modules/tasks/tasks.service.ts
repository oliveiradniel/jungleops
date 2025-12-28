import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UsersTasksService } from '../users-tasks/users-tasks.service';
import { TaskAuditLogsService } from '../task-audit-logs/task-audit-logs.service';
import { EventsPublisherService } from 'src/messaging/events-publisher.service';
import { SignalsPublisherService } from 'src/messaging/signals-publisher.service';

import { CreateTaskAuditLogData } from '../task-audit-logs/types/create-task-audit-log-data.type';

import type { ITasksRepository } from 'src/database/contracts/tasks-repository.contract';

import {
  type CreateTaskData,
  type Task,
  type UpdateTaskData,
  type TaskAuditLog,
  type TaskWithCommentCount,
  type TasksList,
  type TaskFilters,
  AuditAction,
  FieldName,
} from '@challenge/shared';

import { TASKS_REPOSITORY } from 'src/shared/constants/tokens';

@Injectable()
export class TasksService {
  constructor(
    @Inject(TASKS_REPOSITORY)
    private readonly tasksRepository: ITasksRepository,
    private readonly taskAuditLogsService: TaskAuditLogsService,
    private readonly usersTasksService: UsersTasksService,
    private readonly eventsPublisherService: EventsPublisherService,
    private readonly signalsPublisherService: SignalsPublisherService,
  ) {}

  async findById(id: string): Promise<Task> {
    return this.verifyTaskExists(id);
  }

  async list(pagination: TaskFilters): Promise<TasksList> {
    const { page, size, orderBy, order, status, priority, search } = pagination;

    return this.tasksRepository.list({
      page,
      size,
      orderBy,
      order,
      status,
      priority,
      search,
    });
  }

  async listTasksByUserId(userId: string): Promise<TaskWithCommentCount[]> {
    const taskIds = await this.usersTasksService.listTaskIdsByUserId(userId);

    const tasks = await Promise.all(
      taskIds.map((taskId) =>
        this.tasksRepository.getByIdWithCommentsCount(taskId),
      ),
    );

    return tasks.flatMap((task) => (task ? [task] : []));
  }

  async create(data: CreateTaskData): Promise<Task> {
    const { authorId, title, description, term, priority, status } = data;

    const titleTaken = await this.tasksRepository.getByTitle(title);
    if (titleTaken) {
      throw new ConflictException('Title is already in use.');
    }

    const task = await this.tasksRepository.create({
      authorId,
      title,
      description,
      term,
      priority,
      status,
    });

    await this.logTaskChange({
      action: AuditAction.CREATE,
      taskId: task.id,
      userId: task.authorId,
      taskTitle: task.title,
      oldValue: null,
      newValue: JSON.stringify(task),
      fieldName: null,
    });

    this.eventsPublisherService.taskCreated({
      authorId,
      task: {
        id: task.id,
        title,
        priority,
      },
    });

    return task;
  }

  async update(id: string, data: UpdateTaskData): Promise<void> {
    const {
      lastEditedBy,
      userIds = [],
      title,
      description,
      term,
      priority,
      status,
    } = data;

    const task = await this.verifyTaskExists(id);
    if (title) {
      const titleTaken = await this.tasksRepository.getByTitle(title);
      if (titleTaken && titleTaken.id !== id) {
        throw new ConflictException('Title is already in use.');
      }
    }

    const parsedTask = {
      lastEditedBy: lastEditedBy,
      title: title ?? task.title,
      description: description ?? task.description,
      term: term ?? task.term,
      priority: priority ?? task.priority,
      status: status ?? task.status,
    };

    const participantIds = await this.usersTasksService.listUserIdsByTaskId(
      task.id,
    );

    const removedParticipantIds = participantIds.filter(
      (id) => !userIds.includes(id),
    );

    const hasAnyUsersForDeletion = removedParticipantIds.length > 0;

    const addedParticipantIds = userIds.filter(
      (id) => !participantIds.includes(id),
    );

    const addedParticipantIdsCount = addedParticipantIds.length;

    await this.tasksRepository.update(id, { ...parsedTask, userIds });

    const changedFields = [
      {
        fieldName: FieldName.TITLE,
        dirty: parsedTask.title !== task.title,
        newValue: title,
        oldValue: task.title,
      },
      {
        fieldName: FieldName.DESCRIPTION,
        dirty: parsedTask.description !== task.description,
        newValue: description,
        oldValue: task.description,
      },
      {
        fieldName: FieldName.TERM,
        dirty: parsedTask.term !== task.term,
        newValue: parsedTask.term,
        oldValue: task.term,
      },
      {
        fieldName: FieldName.PRIORITY,
        dirty: parsedTask.priority !== task.priority,
        newValue: priority,
        oldValue: task.priority,
      },
      {
        fieldName: FieldName.STATUS,
        dirty: parsedTask.status !== task.status,
        newValue: status,
        oldValue: task.status,
      },
      {
        fieldName: FieldName.USER_IDS,
        dirty: addedParticipantIdsCount > 0 || hasAnyUsersForDeletion,
        newValue: JSON.stringify([...addedParticipantIds, ...participantIds]),
        oldValue: JSON.stringify(participantIds),
      },
    ].filter((field) => field.dirty);

    await Promise.all(
      changedFields.map((field) =>
        this.logTaskChange({
          action: AuditAction.UPDATE,
          taskId: task.id,
          userId: lastEditedBy,
          taskTitle: task.title,
          fieldName: field.fieldName,
          oldValue: field.oldValue,
          newValue: field.newValue!,
        }),
      ),
    );

    this.eventsPublisherService.taskUpdated({
      authorId: lastEditedBy,
      task: {
        id,
        removedParticipantIds,
        addedParticipantIds,
        participantIds,
      },
      oldData: {
        title: task.title,
        status: task.status,
        priority: task.priority,
        term: task.term,
      },
      newData: {
        title,
        status,
        priority,
        term,
      },
    });

    this.signalsPublisherService.taskUpdated({
      authorId: lastEditedBy,
      task: {
        id,
        participantIds,
      },
    });
  }

  async delete(id: string, deletedBy: string): Promise<void> {
    const task = await this.verifyTaskExists(id);
    const participantIds = await this.usersTasksService.listUserIdsByTaskId(id);

    await this.tasksRepository.delete(id);

    await this.logTaskChange({
      action: AuditAction.DELETE,
      taskId: task.id,
      userId: deletedBy,
      taskTitle: task.title,
      oldValue: JSON.stringify(task),
      newValue: null,
      fieldName: null,
    });

    this.eventsPublisherService.taskDeleted({
      authorId: deletedBy,
      task: {
        id: task.id,
        title: task.title,
        participantIds,
      },
    });
  }

  async verifyTaskExists(id: string) {
    const task = await this.tasksRepository.getById(id);
    if (!task) {
      throw new NotFoundException('Task not found.');
    }

    return task;
  }

  private async logTaskChange(
    data: CreateTaskAuditLogData,
  ): Promise<TaskAuditLog> {
    return this.taskAuditLogsService.create(data);
  }
}
