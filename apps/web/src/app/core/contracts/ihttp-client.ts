export interface HttpRequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
  withCredentials?: boolean;
  signal?: AbortSignal;
}

export abstract class IHttpClient {
  abstract get<ResponseType>(
    path: string,
    config?: HttpRequestConfig,
  ): Promise<ResponseType>;
  abstract post<ResponseType>(
    path: string,
    body?: unknown,
    config?: HttpRequestConfig,
  ): Promise<ResponseType>;
  abstract patch(
    path: string,
    body?: unknown,
    config?: HttpRequestConfig,
  ): Promise<void>;
  abstract put(
    path: string,
    body: unknown,
    config?: HttpRequestConfig,
  ): Promise<void>;
  abstract delete(path: string, config?: HttpRequestConfig): Promise<void>;
}
