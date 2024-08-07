// This is the article that appears in the headline section (aka Hero) on top of the Blog page.
import Link from 'next/link';
import BlueButton from '@/components/common/BlueButton';
import Image from 'next/image';
import moment from 'moment';
import { Articles, BlogArticle } from '@/types/Blog.type';

const IMAGE_WIDTH_GRID: number = 362;
const IMAGE_HEIGHT_GRID: number = 241;
const IMAGE_WIDTH_ARTICLE: number = 531;
const IMAGE_HEIGHT_ARTICLE: number = 486;
const AOS_DURATION: number = 400;
const AOS_DELAY: number[] = [100, 200];
const AOS_OFFSET: number = 100;

const FocusArticle = ({ blogListData }: Articles) => {
  const focusArticleData: BlogArticle | null = blogListData
    ? blogListData[0]
    : null;

  const imagePath: string =
    focusArticleData && focusArticleData.image?.url
      ? 'https://vidalco.in' + focusArticleData.image.url
      : '';

  return (
    <>
      <div className="container__border--blue-gradient relative after:absolute flex justify-center flex-col items-center after:contents-[''] after:inset-0 after:p-1 after:rounded-30 rounded-30 mx-3 sm:mx-10 md:mx-16 after:blur-75 blue_linear_gradient mt-45 lg:mt-80pixel xl:mt-123 sm:mb-24pixel lg:mb-56pixel xl:mb-125">
        <Image
          className="lg:w-462 lg:h-541 w-150 -top-160 sm:-left-20  -left-5 absolute opacity-50 -z-20"
          src="/assets/img/svg/blog-grid-line.svg"
          width={IMAGE_WIDTH_GRID}
          height={IMAGE_HEIGHT_GRID}
          alt=""
          quality={75}
          loading="lazy"
        />
        <div className="container md:max-w-full xl:max-w-1140 2xl:max-w-1320 mx-auto py-15 lg:py-25 xl:py-43 relative z-10 after:contents-[''] after:w-207 after:h-207 after:absolute after:top-0 after:-left-50 after:bg-extraDarkBlue after:blur-111 after:-z-10 before:contents-[''] before:w-207 before:h-207 before:absolute before:bottom-0 before:-right-50 before:bg-extraDarkBlue before:blur-111 before:-z-10">
          <div className="flex flex-wrap justify-between flex-col-reverse xl:flex-row items-center">
            <div
              className="lg:max-w-[70%] xl:max-w-[46%] text-center xl:text-start"
              data-aos="fade-up"
              data-aos-duration={AOS_DURATION}
              data-aos-easing="linear"
              data-aos-delay={AOS_DELAY[0]}
              data-aos-offset={AOS_OFFSET}
            >
              <h2 className="font-medium text-md sm:text-lg text-primary font-HelveticaNeueMedium xl:max-w-447 mx-auto xl:mx-0">
                {focusArticleData?.title}
              </h2>
              <p className="text-base text-primary opacity-70 font-Segoe font-normal mt-2">
                by : {focusArticleData?.author?.fullName} &bull;{' '}
                {moment(focusArticleData?.createdAt).format('DD MMM YY')}
              </p>
              <p className="text-base sm:text-md text-primary opacity-70 font-Segoe font-normal mt-3 sm:mt-4">
                {focusArticleData?.previewSummary}
              </p>
              {/*      LET'S GET RID OF THE CATEGORIES FOR NOW. UNCOMMENT THIS BLOCK TO BRING THEM BACK

              <div className="mt-4 flex items-center gap-[14px] justify-center xl:justify-start">
                {focusArticleData.categories?.map((val: Category, i: number) => {
                  return (
                    <button
                      key={i}
                      className="lg:text-base md:text-[13px] text-sm text-skyblue font-Segoe font-normal py-2 px-3 sm:py-[10px] sm:px-[18px] bg-matchtitles rounded-full leading-[150%] duration-300 hover:text-white"
                    >
                      {val.title}
                    </button>
                  );
                })}
              </div> 
              
              */}
              <div className="flex xl:justify-start justify-center items-center mt-4 sm:mt-10">
                <Link href={`blog/${focusArticleData?.slug}?page=1`}>
                  <BlueButton text="Read&nbsp;more" />
                </Link>
              </div>
            </div>
            <div
              className="lg:max-w-30/100 xl:max-w-1/2 relative mt-10 xl:mt-0"
              data-aos="fade-up"
              data-aos-duration={AOS_DURATION}
              data-aos-easing="linear"
              data-aos-delay={AOS_DELAY[1]}
              data-aos-offset={AOS_OFFSET}
            >
              <Image
                className="w-full rounded-2xl"
                src={imagePath}
                width={IMAGE_WIDTH_ARTICLE}
                height={IMAGE_HEIGHT_ARTICLE}
                alt={focusArticleData ? focusArticleData.title : 'Unknown'}
                quality={75}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FocusArticle;
