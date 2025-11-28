import axios from 'axios';

import type { HttpRequestConfig, IHttpClient } from '../contracts/ihttp-client';

import { env } from '@/config/env';

export const httpClient = axios.create({
  baseURL: env.API_URL,
});

export class HttpClient implements IHttpClient {
  async get<ResponseType>(
    path: string,
    config?: HttpRequestConfig,
  ): Promise<ResponseType> {
    const response = await httpClient.get<ResponseType>(path, {
      ...config,
    });

    return response.data;
  }

  async post<ResponseType>(
    path: string,
    body?: unknown,
    config?: HttpRequestConfig,
  ): Promise<ResponseType> {
    const response = await httpClient.post<ResponseType>(path, body, {
      ...config,
    });

    return response.data;
  }

  async put(
    path: string,
    body: unknown,
    config?: HttpRequestConfig,
  ): Promise<void> {
    await httpClient.put<void>(path, body, {
      ...config,
    });
  }

  async delete(path: string, config?: HttpRequestConfig): Promise<void> {
    await httpClient.delete<void>(path, {
      ...config,
    });
  }
}
