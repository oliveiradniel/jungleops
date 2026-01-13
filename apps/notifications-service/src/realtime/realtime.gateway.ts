import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

import {
  type TaskAuditLogSignal,
  type TaskCommentCreatedNotification,
  type TaskCreatedNotification,
  type TaskDeletedNotification,
  type TaskTitleUpdatedNotification,
  type TaskPriorityUpdatedNotification,
  type TaskStatusUpdatedNotification,
  type TaskTermUpdatedNotification,
  type TaskAssignedNotification,
  type TaskUnassignedNotification,
  type TaskUpdatedSignal,
  type TaskCommentCreatedSignal,
  SOCKET_EVENT_KEYS,
  SOCKET_SIGNAL_KEYS,
} from '@challenge/shared';

@WebSocketGateway({ path: '/ws/notifications', cors: { origin: '*' } })
export class RealTimeGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  private clients = new Map<string, Socket>();

  handleConnection(client: Socket) {
    const userId = client.handshake.auth.userId as string;

    if (!userId) {
      client.disconnect();
      return;
    }

    this.clients.set(userId, client);
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.auth.userId as string;

    this.clients.delete(userId);
  }

  notifyCreatedTask(payload: TaskCreatedNotification) {
    const { author } = payload;

    this.clients.forEach((client, userId) => {
      if (userId !== author.id) {
        client.emit(SOCKET_EVENT_KEYS.TASK_CREATED, payload);
      }
    });
  }

  notifyUpdatedTaskTitle(payload: TaskTitleUpdatedNotification) {
    const { author, task } = payload;

    this.notifyParticipants({
      event: SOCKET_EVENT_KEYS.TASK_TITLE_UPDATED,
      payload,
      authorId: author.id,
      participantIds: task.participantIds,
    });
  }

  notifyUpdatedTaskStatus(payload: TaskStatusUpdatedNotification) {
    const { author, task } = payload;

    this.notifyParticipants({
      event: SOCKET_EVENT_KEYS.TASK_STATUS_UPDATED,
      payload,
      authorId: author.id,
      participantIds: task.participantIds,
    });
  }

  notifyUpdatedTaskPriority(payload: TaskPriorityUpdatedNotification) {
    const { author, task } = payload;

    this.notifyParticipants({
      event: SOCKET_EVENT_KEYS.TASK_PRIORITY_UPDATED,
      payload,
      authorId: author.id,
      participantIds: task.participantIds,
    });
  }

  notifyUpdatedTaskTerm(payload: TaskTermUpdatedNotification) {
    const { author, task } = payload;

    this.notifyParticipants({
      event: SOCKET_EVENT_KEYS.TASK_TERM_UPDATED,
      payload,
      authorId: author.id,
      participantIds: task.participantIds,
    });
  }

  notifyAssignedUsers(payload: TaskAssignedNotification) {
    const { author, task } = payload;

    this.notifyParticipants({
      event: SOCKET_EVENT_KEYS.TASK_ASSIGNED,
      payload,
      authorId: author.id,
      participantIds: [...task.participantIds, ...task.addedParticipantIds],
    });
  }

  notifyUnassignedUsers(payload: TaskUnassignedNotification) {
    const { author, task } = payload;

    this.notifyParticipants({
      event: SOCKET_EVENT_KEYS.TASK_UNASSIGNED,
      payload,
      authorId: author.id,
      participantIds: [...task.participantIds, ...task.removedParticipantIds],
    });
  }

  notifyDeletedTask(payload: TaskDeletedNotification) {
    const { author } = payload;

    this.clients.forEach((client, userId) => {
      if (userId !== author.id) {
        client.emit(SOCKET_EVENT_KEYS.TASK_DELETED, payload);
      }
    });
  }

  notifyTaskCommentCreated(payload: TaskCommentCreatedNotification) {
    const { author, task } = payload;

    this.notifyParticipants({
      event: SOCKET_EVENT_KEYS.TASK_COMMENT_CREATED,
      payload,
      authorId: author.id,
      participantIds: [...task.participantIds],
    });
  }

  sinalizeTaskUpdated(payload: TaskUpdatedSignal) {
    const { authorId, task } = payload;

    this.clients.forEach((client, userId) => {
      const isParticipant = task.participantIds.includes(userId);

      if (userId !== authorId && !isParticipant) {
        client.emit(SOCKET_SIGNAL_KEYS.TASK_UPDATED, payload);
      }
    });
  }

  sinalizeTaskCommentCreated(payload: TaskCommentCreatedSignal) {
    const { authorId, task } = payload;

    this.clients.forEach((client, userId) => {
      const isParticipant = task.participantIds.includes(userId);

      if (userId !== authorId && !isParticipant) {
        client.emit(SOCKET_SIGNAL_KEYS.TASK_COMMENT_CREATED, payload);
      }
    });
  }

  sinalizeTaskAuditLog(payload: TaskAuditLogSignal) {
    const { authorId } = payload;

    this.clients.forEach((client, userId) => {
      if (userId !== authorId) {
        client.emit(SOCKET_SIGNAL_KEYS.TASK_AUDIT_LOG, payload);
      }
    });
  }

  private notifyParticipants<T>({
    event,
    payload,
    authorId,
    participantIds,
  }: {
    event: string;
    payload: T;
    authorId: string;
    participantIds: string[];
  }) {
    this.clients.forEach((client, userId) => {
      if (userId !== authorId && participantIds.includes(userId)) {
        client.emit(event, payload);
      }
    });
  }
}
