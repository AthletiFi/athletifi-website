// This component renders the header of the website.
// It includes navigation links and other header elements.
'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowButton,
  FacebookIcon,
  LinkedInIcon,
  TikTokIcon,
  TwitterIcon,
  PageLogo,
} from './Icon';
import SocialPopUp from './SocialPopUp';
import Image from 'next/image';

const SCROLL_THRESHOLD: number = 200;

const Header: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [path, setPath] = useState<string>('');

  useEffect(() => {
    // Set the path state to the current pathname on the client side
    setPath(window.location.pathname);

    const handleBodyOverflow = () => {
      if (open) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    };

    if (typeof window !== 'undefined') {
      handleBodyOverflow();
    }

    return () => {
      // Clean up to remove class when component unmounts or path changes
      document.body.classList.remove('overflow-hidden');
    };
  }, [open]);

  // ==============================================
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    let prevScrollPos: number = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos: number = window.scrollY;
      setScrollPosition(currentScrollPos);
      const isVisible: boolean = prevScrollPos > currentScrollPos;
      setIsVisible(isVisible);
      prevScrollPos = currentScrollPos;
    };
    window.addEventListener('scroll', handleScroll);
    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // ====================================================== nav-social-icon
  const [navSocialIcon, setNavSocialIcon] = useState<boolean>(true);
  const socialIcon = (): void => {
    setOpen(false);
    setNavSocialIcon(!navSocialIcon);
  };
  const socialIconDropDown = () => {
    setNavSocialIcon(!navSocialIcon);
  };

  return (
    <header>
      <div
        ref={navbarRef}
        id="nav_bar"
        className={`navbar fixed top-0 black w-full bg-bgnav py-2 z-40 ${
          scrollPosition > SCROLL_THRESHOLD
            ? 'header--slide-up'
            : 'header--slide-down'
        } ${isVisible ? 'header--slide-down' : 'header--slide-up'}`}
      >
        <div className="container md:max-w-full xl:max-w-1140 2xl:max-w-1320 mx-auto">
          <div className="flex items-center justify-between">
            <Link href="/">
              <PageLogo />
              {/* <Image
                src="/athletifi-logo-web.svg"
                width="75"
                height="64"
                className="w-[65px] sm:w-[75px]"
                alt={''}
              /> */}
            </Link>
            {/* SMALL SCREEN MENU ICONS */}
            <div
              onClick={() => setOpen(!open)}
              className="flex flex-col md:hidden bg-transparent border-0 relative z-50 cursor-pointer"
            >
              <span className="h-3pixel w-35 bg-white inline-block rounded-sm"></span>
              <span className="my-2 h-3pixel w-7 bg-white inline-block rounded-sm"></span>
              <span className="h-3pixel w-35 bg-white inline-block rounded-sm"></span>
            </div>
            <div
              className={
                open
                  ? 'header__nav--open h-full w-full z-20 fixed top-0 left-0 duration-500 transition-all bg-blackBG min-h-screen'
                  : 'header__nav--open md:relative fixed min-h-screen md:min-h-full -left-full md:left-0 duration-500 md:ml-0 md:mt-0 z-40 top-0'
              }
            >
              {/* NAV PAGE LINKS */}
              <ul
                className="flex items-center gap-25 md:gap-40pixel flex-col md:flex-row h-full justify-center"
                role="navigation"
                aria-label="Main"
              >
                <li>
                  <Link
                    onClick={() => setOpen(false)}
                    href="/"
                    className={`text-md text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto ${
                      path == '/' ? '!opacity-100' : ''
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setOpen(false)}
                    href="/about-us"
                    className={`text-md text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto ${
                      path == '/about-us' ? '!opacity-100 ' : ''
                    }`}
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setOpen(false)}
                    href="/news?page=1"
                    className={`text-md text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto ${
                      path == '/news' ? '!opacity-100' : ''
                    }`}
                  >
                    News
                  </Link>
                </li>
                
                {/* UNCOMMENT WHEN YOU ARE READY TO RE-ADD THE DASHBOARD TO THE MENUBAR */}
                <li>
                  <Link
                    onClick={() => setOpen(false)}
                    href="/dashboard/vsa-23/1"
                    className={`text-md text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto ${
                      path == '/dashboard' ? '!opacity-100' : ''
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="social-popup--show sm:mt-7 sm:pb-7 hidden md:block">
                  <button
                    onClick={socialIcon}
                    className={`text-md text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-[2px] after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto ${
                      path == '/SocialIcons' ? '!opacity-100' : ''
                    }`}
                  >
                    Socials
                  </button>
                  <div className="hidden social_btns">
                    <div className="relative h-full z-50">
                      <SocialPopUp />
                    </div>
                  </div>
                </li>
                <li
                  className="md:hidden text-center"
                  onClick={socialIconDropDown}
                >
                  <button
                    className={`text-md text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto ${
                      path == '/SocialIcons' ? '!opacity-100' : ''
                    }`}
                  >
                    Socials
                  </button>
                  <div
                    className={` mt-3 h-180 overflow-scroll social-popup__scroll--hidden ${
                      navSocialIcon ? '!hidden' : 'block'
                    }`}
                  >
                    <div
                      className="flex gap-4 flex-col"
                      role="navigation"
                      aria-label="Socials"
                    >
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
                          width={32}
                          height={32}
                        />
                        <span className="text-white opacity-70 ms-4 text-md font-Segoe font-normal">
                          Instagram
                        </span>
                      </Link>
                      <Link
                        className="hover:-translate-y-1 transition duration-300  flex items-center"
                        href="https://in.linkedin.com/"
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
                        className="sm:px-24pixel px-4 sm:py-14.5 py-2 flex bg-skyblue text-base font-semibold text-white font-Segoe leading-6 gap-6pixel group border border-skyblue hover:bg-black hover:text-skyblue btn__cta transition duration-300 ease-in-out social-popup__btn"
                      >
                        Contact Us
                        <span className="group-hover:translate-x-3 transition duration-300 ease-out">
                          <ArrowButton />
                        </span>
                      </Link>
                    </div>
                  </div>
                </li>
                <li>
                  <Link
                    href="/contact-us"
                    onClick={() => setOpen(false)}
                    className="pt-10pixel pb-14pixel px-24pixel text-skyblue border border-skyblue font-semibold text-base font-Segoe duration-300 hover:bg-skyblue hover:text-white md:hidden"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <Link
              href="/contact-us"
              onClick={() => setOpen(false)}
              className="pt-10pixel pb-14pixel px-24pixel text-skyblue border border-skyblue font-semibold text-base font-Segoe duration-300 hover:bg-skyblue hover:text-white hidden md:inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
