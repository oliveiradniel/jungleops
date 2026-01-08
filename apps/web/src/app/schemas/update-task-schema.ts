import * as z from 'zod';

import { CreateTaskSchema } from './create-task-schema';

export const UpdateTaskSchema = CreateTaskSchema.partial().extend({
  userIds: z.array(z.string()).optional(),
});
