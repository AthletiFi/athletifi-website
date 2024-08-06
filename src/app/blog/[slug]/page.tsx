import BackToTop from '@/components/common/BackToTop';
import CommonHero from '@/components/common/CommonHero';
import { Hero } from '@/types/CommonHero.type';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import BlogInsightsCards from '@/components/blog-insights/BlogInsightsCards';
import TargetArticleContent from '@/components/blog-insights/TargetArticleContent';
import { filterTargetArticle } from '@/utils/helpers';
import { getBlogList } from '@/app/utils/ApiHelper';
import { BlogPageContext } from '@/types/Blog.type';
import { getUserData } from '@/app/utils/fetchHelper';
import { UserData } from '@/types/User.type';
import { isAuthenticated } from '@/app/utils/auth/amplify-utils';

async function getBlogArticle(slug: string) {
  console.log(
    `getBlogArticle URL: ${process.env.NEXT_PUBLIC_API_URL}/blog/${slug}`,
  );
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/${slug}`,
  );
  console.log('response: %s', JSON.stringify(response));
  const data = await response.json();
  console.log('data: %s', JSON.stringify(data));
  return data;
}

// This is the main content of the blog article page, which contains the blog article itself and the sidebar with the other blog articles.
export default async function BlogArticleSlugPage({ params }: BlogPageContext) {
  const blogArticle = await getBlogArticle(params.slug);
  const { allBlogList: allBlogData, allBlogListError: listError } =
    await getBlogList();

  // Error handling and loading states
  // if (detailError || listError) return <div>Error: Data not available</div>;
  if (listError) return <div>Error: Data not available</div>;
  if (!blogArticle || !allBlogData) return <div>Loading...</div>;

  const targetArticle = blogArticle?.data?.[0];
  if (!targetArticle) return <div>Error: Target article not found</div>;

  // Filter out the target article from the allBlogList data
  const everyOtherArticle = filterTargetArticle(
    allBlogData?.data,
    targetArticle,
  );

  // SEO
  const hero: Hero = {
    heading: targetArticle?.title || `Article not found`,
    subtitle:
      'Here you can find all the latest blog and developments from AthletiFi!',
    title: 'Blog and Updates for AthletiFi Sports Cards',
  };

  const auth = await isAuthenticated();
  const userData = auth.isSignedIn ? await getUserData(auth) : null;

  return (
    <>
      <div className="overflow-hidden">
        <div className="blog-page__hero-bg bg-center bg-no-repeat bg-cover">
          <Header userData={userData as UserData} />
          <CommonHero hero={hero} />
        </div>
        <TargetArticleContent blogArticle={blogArticle} />
        <BlogInsightsCards allBlogList={everyOtherArticle} />
        <Footer />
        <BackToTop />
      </div>
    </>
  );
}
