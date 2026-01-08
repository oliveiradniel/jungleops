export interface AccessToken {
  accessToken: string;
}

export type Tokens = { refreshToken: string } & AccessToken;
