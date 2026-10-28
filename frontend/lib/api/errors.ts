/** Thrown for non-2xx responses (except 404 where the caller asks for null). Carries the request context. */
export class ApiError extends Error {
  readonly status: number;
  readonly path: string;

  constructor(status: number, path: string, detail?: string) {
    const suffix = detail ? `: ${detail}` : '';
    super(`API ${status} for ${path}${suffix}`);
    this.name = 'ApiError';
    this.status = status;
    this.path = path;
  }
}
