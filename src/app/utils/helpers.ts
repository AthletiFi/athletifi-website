import { BlogsArticle } from '@/types/Blogs.type';
import { Source_Sans_3 } from 'next/font/google';

export function filterTargetArticle(
  allBlogsData: BlogsArticle[],
  targetArticle: BlogsArticle | undefined,
): BlogsArticle[] {
  return targetArticle
    ? allBlogsData.filter((article) => article.slug !== targetArticle.slug)
    : allBlogsData;
}

export const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
});
