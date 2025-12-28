import { io, type Socket } from 'socket.io-client';
import { env } from '@/config/env';

let socket: Socket | null = null;

export function getNotificationsSocket(userId: string): Socket {
  if (!socket) {
    socket = io(env.NOTIFICATIONS_SERVICE_BASE_URL, {
      auth: { userId },
      transports: ['websocket'],
    });
  }

  return socket;
}

export function disconnectNotificationsSocket() {
  socket?.disconnect();
  socket = null;
}
