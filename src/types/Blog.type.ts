export type BlogImage = {
  url: string;
};

export enum AuthorRoles {
  'Sr. Chief Editor',
  'Editor',
  'Author',
  'Founder',
}

export type Author = {
  fullName: string;
  img?: string;
  title: AuthorRoles;
  order: number;
  active: boolean;
};

export type Category = {
  title: string;
};

export type BlogContent = {
  subheading: string;
  body: string;
};

export interface BlogArticle {
  id: number;
  title: string;
  description: string;
  slug: string;
  previewSummary: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: BlogImage;
  author: Author;
  content: BlogContent[];
  categories: Category[];
}

export interface PaginatedWorkflow {
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
  data: BlogArticle[];
}

export interface Articles {
  blogListData?: BlogArticle[];
}

export interface AllArticles {
  allBlogList: BlogArticle[] | null;
}

export interface BlogProps extends Articles {
  allBlogList: PaginatedWorkflow;
}

export interface BlogDetails {
  blogArticle: PaginatedWorkflow;
}

export interface BlogSlugProps extends BlogDetails {
  allBlogData: PaginatedWorkflow;
}

export interface BlogPageContext {
  params: {
    slug: string;
  };
  searchParams?: {
    page: string;
  };
}
