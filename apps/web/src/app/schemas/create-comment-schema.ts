import * as z from 'zod';

export const CreateCommentSchema = z.object({
  userId: z
    .uuidv4({ error: 'O ID do usuário deve ser um UUID v4.' })
    .nonempty({ error: 'O ID do autor é obrigatório.' }),
  comment: z
    .string({ error: 'Informe um comentário válido.' })
    .min(1, { error: 'O comentário é obrigatório.' }),
});

export const CreateCommentWithoutUserIdSchema = CreateCommentSchema.omit({
  userId: true,
});
