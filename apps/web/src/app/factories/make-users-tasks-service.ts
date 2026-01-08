import { UsersTasksService } from '../core/services/users-tasks-service';

import { makeHttpClient } from './make-http-client';

export function makeUsersTasksService() {
  return new UsersTasksService(makeHttpClient());
}
