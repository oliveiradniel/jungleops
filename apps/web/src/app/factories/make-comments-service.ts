import { CommentsService } from '../core/services/comments-service';

import { makeHttpClient } from './make-http-client';

export function makeCommentsService() {
  return new CommentsService(makeHttpClient());
}
