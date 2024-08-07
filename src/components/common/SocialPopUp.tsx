import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowButton,
  FacebookIcon,
  LinkedInIcon,
  TikTokIcon,
  TwitterIcon,
} from './Icon';

const INSTAGRAM_ICON_SIZE: number = 32;

const SocialPopUp: React.FC = () => {
  return (
    <>
      <div className="social-popup__bg flex items-start justify-center gap-20pixel sm:fixed sm:top-90 top-full left-20/100 sm:left-1/2 z-20 flex-col-reverse p-6 ">
        {/* CONTACT US BUTTON */}
        <div className="flex gap-4 flex-col">
          {/* SOCIAL ICONS LINKS */}
          <Link
            className="hover:-translate-y-1 transition duration-300 ease-out flex items-center"
            href="https://www.tiktok.com/@athletifi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TikTokIcon />
            <span className="text-white opacity-70 ms-4 text-md font-Segoe font-normal">
              TikTok
            </span>
          </Link>
          <Link
            className="hover:-translate-y-1 transition duration-300  flex items-center"
            href="https://www.facebook.com/profile.php?id=61553263775533"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon />
            <span className="text-white opacity-70 ms-4 text-md font-Segoe font-normal">
              Facebook
            </span>
          </Link>
          <Link
            className="hover:-translate-y-1 transition duration-300  flex items-center"
            href="https://twitter.com/Athletifi"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
            <span className="text-white opacity-70 ms-4 text-md font-Segoe font-normal">
              Twitter
            </span>
          </Link>
          <Link
            className="hover:-translate-y-1 transition duration-300  flex items-center"
            href="https://www.instagram.com/athletifi/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/assets/img/svg/Instagram.svg"
              alt="Instagram icon"
              width={INSTAGRAM_ICON_SIZE}
              height={INSTAGRAM_ICON_SIZE}
              quality={75}
              loading="lazy"
            />
            <span className="text-white opacity-70 ms-4 text-md font-Segoe font-normal">
              Instagram
            </span>
          </Link>
          <Link
            className="hover:-translate-y-1 transition duration-300  flex items-center"
            href="https://www.linkedin.com/company/athletifi/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
            <span className="text-white opacity-70 ms-4 text-md font-Segoe font-normal">
              Linkedin
            </span>
          </Link>
          <Link
            href="/contact-us"
            className="sm:px-24pixel px-4 sm:py-14.5 py-2 flex bg-skyblue text-base font-semibold text-white font-Segoe leading-6 gap-6pixel group border border-skyblue hover:bg-black hover:text-skyblue btn__cta transition duration-300 ease-in-out social_btn_contact_us relative z-20"
          >
            Contact Us
            <span className="group-hover:translate-x-3 transition duration-300 ease-out">
              <ArrowButton />
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SocialPopUp;
