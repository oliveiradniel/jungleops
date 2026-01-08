import type { HttpRequestConfig } from './ihttp-client';

import type { UserWithoutPassword } from '@challenge/shared';

export abstract class IUsersService {
  abstract list(config?: HttpRequestConfig): Promise<UserWithoutPassword[]>;
}
