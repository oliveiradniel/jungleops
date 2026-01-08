import { UserWithoutPassword } from '../../entities';

export type SessionPayload = {
  user: UserWithoutPassword;
  accessToken: string;
};
