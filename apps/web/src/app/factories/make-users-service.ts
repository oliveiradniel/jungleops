import { UsersService } from '../core/services/users-service';

import { makeHttpClient } from './make-http-client';

export function makeUsersService() {
  return new UsersService(makeHttpClient());
}
