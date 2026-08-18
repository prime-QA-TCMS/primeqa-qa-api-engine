import { expect, type APIRequestContext, type APIResponse } from '@playwright/test';

export interface ApiEngineOptions {
  baseUrl: string;
  headers?: Record<string, string>;
}

export class ApiEngine {
  constructor(
    public readonly request: APIRequestContext,
    public readonly options: ApiEngineOptions,
  ) {}

  private url(path: string): string {
    return new URL(path, this.options.baseUrl).toString();
  }

  async get(path: string): Promise<APIResponse> {
    return this.request.get(this.url(path), { headers: this.options.headers });
  }

  async post(path: string, data?: unknown): Promise<APIResponse> {
    return this.request.post(this.url(path), { headers: this.options.headers, data });
  }

  async put(path: string, data?: unknown): Promise<APIResponse> {
    return this.request.put(this.url(path), { headers: this.options.headers, data });
  }

  async patch(path: string, data?: unknown): Promise<APIResponse> {
    return this.request.patch(this.url(path), { headers: this.options.headers, data });
  }

  async delete(path: string): Promise<APIResponse> {
    return this.request.delete(this.url(path), { headers: this.options.headers });
  }

  expectStatus(response: APIResponse, expected: number): void {
    expect(response.status()).toBe(expected);
  }

  async json<T>(response: APIResponse): Promise<T> {
    return response.json() as Promise<T>;
  }
}
