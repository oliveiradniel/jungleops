import * as z from 'zod';

import type {
  CreateCommentSchema,
  CreateCommentWithoutUserIdSchema,
} from '@/app/schemas/create-comment-schema';

export type CreateCommentData = z.infer<typeof CreateCommentSchema>;
export type CreateCommentWithoutUserIdData = z.infer<
  typeof CreateCommentWithoutUserIdSchema
>;
