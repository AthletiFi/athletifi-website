import { PaginatedWorkflow } from '@/types/Blogs.type';
export interface BlogsApiResponse {
  res: PaginatedWorkflow;
  error: string | null | undefined;
}

export interface BlogsListResult {
  allBlogsList: PaginatedWorkflow | null;
  allBlogsListError: string | null | undefined;
}

export type PostData<T> = {
  data: T;
};
