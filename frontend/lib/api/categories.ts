import type { CategoryDto } from '@/types/api';
import { apiGet } from './client';

export function getCategories(): Promise<CategoryDto[]> {
  return apiGet<CategoryDto[]>('/api/categories', { tags: ['categories'] });
}
