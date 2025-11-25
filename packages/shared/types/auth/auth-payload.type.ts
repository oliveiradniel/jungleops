import { UserWithoutPassword } from 'entities';

export type AuthPayload = {
  user: UserWithoutPassword;
  refreshToken: string;
  accessToken: string;
};
