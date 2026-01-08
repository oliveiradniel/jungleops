import { ACCESS_TOKEN_KEY } from '../constants/access-token-key';

export function getAccessToken(): string | null {
  try {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!accessToken) return null;

    return JSON.parse(accessToken);
  } catch {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    return null;
  }
}

export function setAccessToken(accessToken: string | undefined): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(accessToken));
}

export function removeAccessToken(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}
