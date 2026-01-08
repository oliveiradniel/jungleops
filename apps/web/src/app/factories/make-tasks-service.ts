import { TasksService } from '../core/services/tasks-service';

import { makeHttpClient } from './make-http-client';

import type { ITasksService } from '../core/contracts/itasks-service';

export function makeTasksService(): ITasksService {
  return new TasksService(makeHttpClient());
}
