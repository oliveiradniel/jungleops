import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';

import { Socket } from 'socket.io';

import { ActionPayload } from '@challenge/shared';

@WebSocketGateway({ cors: { origin: '*' } })
export class TaskAuditLogGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
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

    if (userId) {
      this.clients.delete(userId);
    }
  }

  notifyChangedTaskAuditLog({ action }: ActionPayload) {
    this.clients.forEach((client) => {
      client.emit('task-audit-log:changed', { action });
    });
  }
}
