export type BlogsImage = {
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

export type BlogsContent = {
  subheading: string;
  body: string;
};

export interface BlogsArticle {
  id: number;
  title: string;
  description: string;
  slug: string;
  previewSummary: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: BlogsImage;
  author: Author;
  content: BlogsContent[];
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
  data: BlogsArticle[];
}

export interface Articles {
  blogsListData?: BlogsArticle[];
}

export interface AllArticles {
  allBlogsList: BlogsArticle[] | null;
}

export interface BlogsProps extends Articles {
  allBlogsList: PaginatedWorkflow;
}

export interface BlogsDetails {
  blogsArticle: PaginatedWorkflow;
}

export interface BlogsSlugProps extends BlogsDetails {
  allBlogsData: PaginatedWorkflow;
}

export interface BlogsPageContext {
  params: {
    slug: string;
  };
  searchParams?: {
    page: string;
  };
}
