import * as z from 'zod';

export const AuthSchema = z.object({
  email: z
    .email({ error: 'Informe um e-mail válido.' })
    .nonempty({ error: 'O e-mail é obrigatório.' }),
  username: z
    .string({ error: 'Informe um nome de usuário válido.' })
    .min(5, { error: 'O nome de usuário deve conter pelo menos 5 dígitos' })
    .nonempty({ error: 'O nome de usuário é obrigatório.' }),
  password: z
    .string({ error: 'Informe uma senha valida.' })
    .min(8, { error: 'A senha deve conter pelo menos 8 dígitos' })
    .nonempty({ error: 'A senha é obrigatória.' }),
});

export const RegisterSchema = AuthSchema;

export const LoginSchema = AuthSchema.omit({ username: true });
