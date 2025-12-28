import * as z from 'zod';

import { TaskPriority, TaskStatus } from '@challenge/shared';

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
            .map((v) => v.toUpperCase() as TaskStatus)
            .filter((value) => Object.values(TaskStatus).includes(value));
        }

        return value;
      },
      z.array(z.enum(TaskStatus)),
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
            .map((value) => value.toUpperCase() as TaskPriority)
            .filter((value) => Object.values(TaskPriority).includes(value));
        }

        return value;
      },
      z.array(z.enum(TaskPriority)),
    )
    .transform((values) => {
      return values.map((value) => value.toLowerCase()).join(',');
    })
    .optional(),
  q: z.string().optional(),
});
