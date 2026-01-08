import { Request } from 'express';

import { REFRESH_TOKEN_COOKIE_KEY } from '../constants';

export function cookieExtractor(request: Request): string | null {
  if (request && request.cookies) {
    return request.cookies[REFRESH_TOKEN_COOKIE_KEY];
  }

  return null;
}
