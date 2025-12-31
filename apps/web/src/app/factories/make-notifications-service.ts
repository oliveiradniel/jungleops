import { NotificationsService } from '../core/services/notifications-service';
import { makeHttpClient } from './make-http-client';

export function makeNotificationsService() {
  return new NotificationsService(makeHttpClient());
}
