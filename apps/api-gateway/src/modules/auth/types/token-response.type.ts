export interface RefreshTokenResponse {
  refreshToken: string;
}

export type TokensResponse = { accessToken: string } & RefreshTokenResponse;
