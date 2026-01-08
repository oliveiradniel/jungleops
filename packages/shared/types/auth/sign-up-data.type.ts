import type { SignInData } from './sign-in-data.type';

export interface SignUpData extends SignInData {
  username: string;
}
