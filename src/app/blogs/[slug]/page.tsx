import BackToTop from '@/components/common/BackToTop';
import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import BlogsInsightsCards from '@/components/blogs-insights/BlogsInsightsCards';
import TargetArticleContent from '@/components/blogs-insights/TargetArticleContent';
import { filterTargetArticle } from '@/utils/helpers';
import { getBlogsList } from '@/app/utils/ApiHelper';
import { BlogsPageContext } from '@/types/Blogs.type';
import { getUserData } from '@/app/utils/fetchHelper';
import { UserData } from '@/types/User.type';
import { isAuthenticated } from '@/app/utils/auth/amplify-utils';

async function getBlogsArticle(slug: string) {
  console.log(
    `getBlogsArticle URL: ${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`,
  );
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`,
  );
  console.log('response: %s', JSON.stringify(response));
  const data = await response.json();
  console.log('data: %s', JSON.stringify(data));
  return data;
}

// This is the main content of the blogs article page, which contains the blogs article itself and the sidebar with the other blogs articles.
export default async function BlogsArticleSlugPage({
  params,
}: BlogsPageContext) {
  const blogsArticle = await getBlogsArticle(params.slug);
  const { allBlogsList: allBlogsData, allBlogsListError: listError } =
    await getBlogsList();

  // Error handling and loading states
  // if (detailError || listError) return <div>Error: Data not available</div>;
  if (listError) return <div>Error: Data not available</div>;
  if (!blogsArticle || !allBlogsData) return <div>Loading...</div>;

  const targetArticle = blogsArticle?.data?.[0];
  if (!targetArticle) return <div>Error: Target article not found</div>;

  // Filter out the target article from the allBlogsList data
  const everyOtherArticle = filterTargetArticle(
    allBlogsData?.data,
    targetArticle,
  );

  // SEO
  const hero: Hero = {
    heading: targetArticle?.title || `Article not found`,
    subtitle:
      'Here you can find all the latest blogs and developments from AthletiFi!',
    title: 'Blogs and Updates for AthletiFi Sports Cards',
  };

  const auth = await isAuthenticated();
  const userData = auth.isSignedIn ? await getUserData(auth) : null;

  return (
    <>
      <div className="overflow-hidden">
        <div className="blogs-page__hero-bg bg-center bg-no-repeat bg-cover">
          <Header userData={userData as UserData} />
          <CommonHero hero={hero} />
        </div>
        <TargetArticleContent blogsArticle={blogsArticle} />
        <BlogsInsightsCards allBlogsList={everyOtherArticle} />
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
