import * as z from 'zod';

import { TaskStatusValues, type TaskStatus } from '../enums/TaskStatus';
import { TaskPriorityValues, type TaskPriority } from '../enums/TaskPriority';

export const TaskFiltersSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  size: z.coerce.number().int().positive().default(10),
  orderBy: z
    .preprocess(
      (value) => {
        if (typeof value === 'string') {
          const val = value?.toLowerCase();
          return val === 'created-at' || val === 'term' ? val : 'term';
        }
      },
      z.enum(['created-at', 'term']),
    )
    .default('term'),
  order: z
    .preprocess(
      (value) => {
        if (typeof value === 'string') {
          const val = value?.toLowerCase();
          return val === 'asc' || val === 'desc' ? val : 'asc';
        }
      },
      z.enum(['asc', 'desc']),
    )
    .default('asc'),
  status: z
    .preprocess(
      (value) => {
        if (typeof value === 'string') {
          return value
            .split(',')
            .map((v) => v.toUpperCase())
            .filter((value) => TaskStatusValues.includes(value as TaskStatus));
        }

        return value;
      },
      z.array(z.enum(TaskStatusValues)),
    )
    .transform((values) => {
      return values.map((value) => value.toLowerCase()).join(',');
    })
    .optional(),
  priority: z
    .preprocess(
      (value) => {
        if (typeof value === 'string') {
          return value
            .split(',')
            .map((value) => value.toUpperCase())
            .filter((value) =>
              TaskPriorityValues.includes(value as TaskPriority),
            );
        }

        return value;
      },
      z.array(z.enum(TaskPriorityValues)),
    )
    .transform((values) => {
      return values.map((value) => value.toLowerCase()).join(',');
    })
    .optional(),
});
