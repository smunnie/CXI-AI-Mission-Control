import { z } from 'zod';
import { dashboardDataSchema } from './schema';

export const api = {
  dashboard: {
    get: {
      method: 'GET' as const,
      path: '/api/mission-control' as const,
      responses: {
        200: dashboardDataSchema,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
