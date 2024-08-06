'use client';
// This component renders the footer of the website.
// It includes copyright information and footer links.
import React, { useEffect, useState } from 'react';
import {
  WhiteFacebookIcon,
  WhiteInstaIcon,
  WhiteLinkedInIcon,
  TikTokIcon,
  WhiteTwitterIcon,
  PageLogo,
} from './Icon';
import Link from 'next/link';

const Footer = () => {
  const today: Date = new Date();
  const year: number = today.getFullYear();

  // Initialize path state with empty string
  const [path, setPath] = useState('');

  // Effect hook to set path on client-side
  useEffect(() => {
    // Use window.location.pathname to get the current path
    setPath(window.location.pathname);
  }, []);

  return (
    <>
      <footer className="flex flex-col justify-center border-t border-darkerSkyBlue">
        <div className="container flex flex-row items-start justify-around gap-5 md:flex-row md:justify-around md:max-w-full xl:max-w-1140 2xl:max-w-1320  my-32">
          <div className="flex flex-col justify-start">
            <ul>
              <li>
                <Link
                  href="/"
                  className={`text-base text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto ${
                    path == '/' ? '!opacity-100' : ''
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className={`text-base text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto ${
                    path == '/about-us' ? '!opacity-100 ' : ''
                  }`}
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog?page=1"
                  className={`text-base text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto ${
                    path == '/blog' ? '!opacity-100' : ''
                  }`}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className={`text-base text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto ${
                    path == '/contact-us' ? '!opacity-100' : ''
                  }`}
                >
                  Contact Us
                </Link>
              </li>
              {/* 
                UNCOMMENT WHEN YOU ARE READY TO RE-ADD THE DASHBOARD TO THE MENUBAR
                <li>
                  <Link
                    onClick={() => setOpen(false)}
                    href="/dashboard"
                    className={`text-base text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto ${
                      path == '/dashboard' ? '!opacity-100' : ''
                    }`}
                  >
                    Dashboard
                  </Link>
                </li> */}
            </ul>
          </div>
          <div className="flex flex-col justify-start">
            <ul>
              <li>
                <Link
                  href="https://www.athletifiselect.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-base text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto
              
                  }`}
                >
                  Athletifi Select
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className={`text-base text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto ${
                    path == '/privacy-policy' ? '!opacity-100' : ''
                  }`}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-use"
                  className={`text-base text-white font-normal font-Segoe opacity-70 hover:opacity-100 duration-300 relative after:content-[''] after:absolute after:w-0 hover:after:w-full after:h-2pixel after:-bottom-1 after:right-0 after:bg-shadow_blue after:rounded-md after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:right-auto ${
                    path == '/terms-of-use' ? '!opacity-100' : ''
                  }`}
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
          {/* <div>
            <Link
              href="/sign-up"
              className="sm:px-24pixel px-4 sm:py-14.5 py-2 flex bg-skyblue text-base font-semibold text-white font-Segoe leading-6 gap-6pixel group border border-skyblue hover:bg-black hover:text-skyblue btn__cta transition duration-300 ease-in-out social-popup__btn"
            >
              Contact Us
              <span className="group-hover:translate-x-3 transition duration-300 ease-out">
                <ArrowButton />
              </span>
            </Link>
          </div> */}
        </div>
        <span className="hidden md:block h-px w-10/12 mb-7 mx-auto bg-partnersBorders" />
        <div className="flex flex-col justify-center">
          <div className="max-w-10/12 min-w-10/12 mx-0 flex flex-wrap md:flex-nowrap gap-5 items-center justify-around pb-7">
            <div className="px-15 md:px-0">
              <Link href="/">
                <PageLogo />
              </Link>
            </div>

            {/* SOCIAL-ICON */}
            <div className="flex gap-4 md:order-3 px-15 md:px-0">
              <Link
                aria-label="Tik-Tok"
                className="hover:-translate-y-1 transition duration-300 ease-out"
                href="https://www.tiktok.com/@athletifi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TikTokIcon />
              </Link>
              <Link
                aria-label="facebook"
                className="hover:-translate-y-1 transition duration-300 ease-out"
                href="https://www.facebook.com/profile.php?id=61553263775533"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhiteFacebookIcon />
              </Link>
              <Link
                aria-label="twitter"
                className="hover:-translate-y-1 transition duration-300 ease-out"
                href="https://twitter.com/Athletifi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhiteTwitterIcon />
              </Link>
              <Link
                aria-label="instagram"
                className="hover:-translate-y-1 transition duration-300 ease-out"
                href="https://www.instagram.com/athletifi/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhiteInstaIcon />
              </Link>
              <Link
                aria-label="linkedin"
                className="hover:-translate-y-1 transition duration-300 ease-out"
                href="https://www.linkedin.com/company/athletifi/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhiteLinkedInIcon />
              </Link>
            </div>
          </div>
          <div className="flex justify-center pb-2">
            <p className="text-white text-sm font-Segoe opacity-70">
              &copy;{year} Athletifi. All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
