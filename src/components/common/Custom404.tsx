import Link from 'next/link';

const Custom404: React.FC = () => {
  return (
    <div className="container md:max-w-full xl:max-w-1140 2xl:max-w-1320 mx-auto px-3 relative z-10 text-primary default__container">
      <div className="font-HelveticaNeueMedium md:text-5xl text-basemd sm:text-4xl text-primary font-medium leading-60 relative z-20 text-center md:mb-4">
        Oops. There was a problem.
      </div>
      <div className="font-Segoe font-normal text-md leading-7 text-center pb-0.5 text-primary opacity-80 m-0 sm:pt-4 lg:max-w-769 mx-auto sm:px-6 px-3 xl:px-0 relative z-20">
        We could not find the page you were looking for.
        <br /> Go back to the{' '}
        <Link href="/" className="redirect__link">
          home page
        </Link>
      </div>
    </div>
  );
};
export default Custom404;
