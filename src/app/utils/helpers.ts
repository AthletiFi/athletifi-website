import { NewsArticle } from '@/types/News.type';
import { Source_Sans_3 } from 'next/font/google';

export function filterTargetArticle(
  allNewsData: NewsArticle[],
  targetArticle: NewsArticle | undefined,
): NewsArticle[] {
  return targetArticle
    ? allNewsData.filter((article) => article.slug !== targetArticle.slug)
    : allNewsData;
}

export const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  display: 'swap',
});
