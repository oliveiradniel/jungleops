import { HttpClient } from '../core/infra/http-client';
import type { IHttpClient } from '../core/contracts/ihttp-client';

export function makeHttpClient(): IHttpClient {
  return new HttpClient();
}
