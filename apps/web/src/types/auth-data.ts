import * as z from 'zod';

import type { LoginSchema, RegisterSchema } from '@/app/schemas/auth-schema';

export type LoginData = z.infer<typeof LoginSchema>;
export type RegisterData = z.infer<typeof RegisterSchema>;
