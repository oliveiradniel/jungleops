import * as z from 'zod';

export const PaginationSearchSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  size: z.coerce.number().int().positive().default(10),
});
