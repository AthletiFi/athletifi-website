import dynamic from 'next/dynamic';
import '@/styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Open_Sans } from 'next/font/google';
import Auth from '@/components/auth/Auth';
import { SEO_CONFIG, BASEURL } from '@/utils/seoConfig';
import { Metadata } from 'next';

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
});

const AOSInitializerWithNoSSR = dynamic(
  () => import('@/utils/AOSInitializer'),
  { ssr: false },
);

export const metadata: Metadata = {
  metadataBase: new URL(BASEURL),
  keywords: ['AthletiFi', 'Club Soccer', 'Club Football'], // TODO: update keywords
  title: SEO_CONFIG.home.title,
  description: SEO_CONFIG.home.description,
  openGraph: {
    images: SEO_CONFIG.home.image,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" className={openSans.className}>
      <head></head>
      <body>
        <GoogleAnalytics gaId={gaId as string} />
        <AOSInitializerWithNoSSR />
        <SkeletonTheme baseColor="#032436" highlightColor="#525252">
          <Auth>{children}</Auth>
        </SkeletonTheme>
      </body>
    </html>
  );
}
