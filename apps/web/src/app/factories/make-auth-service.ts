import { AuthService } from '../core/services/auth-service';
import type { IAuthService } from '../core/contracts/iauth-service';

import { makeHttpClient } from './make-http-client';

export function makeAuthService(): IAuthService {
  return new AuthService(makeHttpClient());
}
