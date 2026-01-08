import * as z from 'zod';

import type { CreateTaskSchema } from '@/app/schemas/create-task-schema';
import type { UpdateTaskSchema } from '@/app/schemas/update-task-schema';

export type CreateTaskData = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskData = z.infer<typeof UpdateTaskSchema>;
