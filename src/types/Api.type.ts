import { PaginatedWorkflow } from '@/types/Blog.type';
export interface BlogApiResponse {
  res: PaginatedWorkflow;
  error: string | null | undefined;
}

export interface BlogListResult {
  allBlogList: PaginatedWorkflow | null;
  allBlogListError: string | null | undefined;
}

export type PostData<T> = {
  data: T;
};
