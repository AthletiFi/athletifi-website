import { BlogArticle } from '@/types/Blog.type';
import { Source_Sans_3 } from 'next/font/google';

export function filterTargetArticle(
  allBlogData: BlogArticle[],
  targetArticle: BlogArticle | undefined,
): BlogArticle[] {
  return targetArticle
    ? allBlogData.filter((article) => article.slug !== targetArticle.slug)
    : allBlogData;
}

export const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
});
