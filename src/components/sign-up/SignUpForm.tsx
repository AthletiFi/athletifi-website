import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { ButtonWhiteArrow, UnderLineText } from '../common/Icon';
import { PostRequestHandler } from '../common/api/Api';
import { PostNewsLetterHandler } from '../common/api/ApiUrls';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpForm = () => {
  // CUSTOM INPUT-CHECK
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialState = {
    email: '',
  };
  const [data, setData] = useState(initialState);

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDetails = { data };
    const toastOptions: ToastOptions = {
      draggable: false,
      position: toast.POSITION.BOTTOM_RIGHT,
    };

    setLoading(true);
    if (checked) {
      try {
        const response = await PostRequestHandler(
          PostNewsLetterHandler(),
          formDetails
        );
        console.log(response);
        if (response.data) {
          toast.success('You have successfully signed-up!', toastOptions);
          setData({
            ...data,
            email: '',
          });
        } else if (response.response.status === 400) {
          toast.error(
            'This email has already been used to sign-up',
            toastOptions
          );
        }
      } catch (err) {
        console.log(err);
        toast.error('Hit an unknown error', toastOptions);
      }
    } else {
      toast.warning(
        'Please review and agree to the Terms and Privacy Policy',
        toastOptions
      );
    }
    setLoading(false);
  };
  return (
    <section className="py-8 sm:py-[64px] lg:pt-[100px] xl:pt-[145px] lg:pb-[100px] xl:pb-[139px] relative z-20 before:content-[''] before:absolute before:w-[457px] before:h-[457px] before:top-2 before:-left-40 before:bg-shadow_blue before:blur-[111px] before:opacity-25 before:-z-10 before:rounded-full overflow-hidden">
      {/* GRID-LINE IMG */}
      <Image
        className="lg:w-[462px] lg:h-[452px] w-40 h-40 lg:top-10 lg:-left-10 absolute -z-20 opacity-40"
        src="/assets/img/svg/news-grid-line.svg"
        width={400}
        height={448}
        alt=""
      />
      <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 relative z-10">
        <div className="flex justify-between flex-wrap grid-cols-2 w-full">
          <div className="lg:w-1/2 w-full">
            <div className="flex flex-col items-center lg:items-start">
              <h2 className="font-HelveticaNeueMedium font-medium text-[24px] md:text-5xl sm:text-4xl leading-[60px] text-[#FDFEFF] md:mb-3">
                <span className="relative">
                  Sign Up!
                  <span className="absolute -bottom-3 left-0">
                    <UnderLineText />
                  </span>
                </span>
              </h2>
              <h3 className="font-Segoe font-normal text-md md:max-w-[365px] text-center lg:text-start text-[#FDFEFF] mx-auto lg:ms-0 leading-[27px] sm:pt-4 md:pt-3">
                Sign-up for exclusive updates! Become part of the sport&apos;s
                revolution.
              </h3>
              <p className="font-Segoe font-normal text-md md:max-w-[600px] lg:max-w-[543px] text-center lg:text-start text-white mx-auto lg:ms-0 opacity-70 mt-2 sm:pt-0.5 leading-[27px]">
                By subscribing, you&apos;re not only embracing the future of
                sports collectibles, but you&apos;re also at the ground floor of
                changing the world of access to sports as we know them today-- a
                future of sports where anyone can get exposure to scouts.
              </p>
              <form
                action="submit"
                onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                  formHandler(e)
                }
                className="w-full sm:w-3/4"
              >
                <div className="flex flex-col mt-6">
                  {/* EMAIL INPUT */}
                  <label
                    className="font-Segoe font-normal group text-md md:max-w-[365px] text-[#FDFEFF] opacity-80 leading-[27px]"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    required
                    value={data.email}
                    type="email"
                    placeholder="Email"
                    className="font-Sugoe font-normal input:-webkit-autofill focus:border-[white] autofill:none text-base text-[#FDFEFF] leading-6 py-5 px-4 bg-transparent w-full lg:max-w-[400px] mt-[5px] border border-1 border-[#FFFFFF40] outline-none"
                    id="email"
                    onChange={e =>
                      setData({
                        ...data,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex items-center gap-2 mt-4 sign-up__checkbox">
                  <input
                    type="checkbox"
                    id="Privacy-Policy"
                    onChange={event => setChecked(event.target.checked)}
                  />
                  <label
                    htmlFor="Privacy-Policy"
                    className="font-Segoe font-normal text-md md:max-w-[365px] text-[#FDFEFF] opacity-80 leading-[27px] "
                  >
                    I agree to the{' '}
                    <Link
                      href="/terms-of-use"
                      className="sign-up__link"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Terms of Use
                    </Link>{' '}
                    and{' '}
                    <Link
                      href="/privacy-policy"
                      className="sign-up__link"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {/* SIGN UP BUTTON */}
                <div className="flex mt-6 md:mt-8 lg:max-w-[400px]">
                  <button
                    type="submit"
                    className={`sm:w-full justify-center text-center sm:px-[24px] px-4 sm:py-[14.5px] py-2 flex bg-skyblue text-base font-semibold text-white font-Segoe leading-6 gap-[6px] group border border-skyblue hover:bg-black btn__cta transition duration-300 ease-in-out ${
                      checked ? ' bg-skyblue' : ''
                    }`}
                  >
                    {loading ? 'Loading...' : ' Sign Up'}

                    <span className="group-hover:translate-x-3 transition duration-300 ease-out">
                      <ButtonWhiteArrow />
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="lg:w-1/2 sm:w-3/5 mx-auto w-full relative flex justify-center items-center z-20 before:content-[''] before:absolute before:w-[457px] before:h-[457px] before:-bottom-28 before:-right-40 before:bg-shadow_blue before:blur-[111px] before:opacity-25 before:-z-10 before:rounded-full">
            {/* FOOTBALL PLAYER IMAGE */}
            <Image
              className="xl:max-w-[658px] xl:h-[610px] lg:absolute lg:right-0 mt-10 lg:mt-0"
              src="/assets/img/webp/signup-img.webp"
              width={658}
              height={598}
              alt="Player shoots the ball in front of a defender and a goalkeeper"
            />
          </div>
        </div>
      </div>
      <ToastContainer theme="dark" />
    </section>
  );
};

export default SignUpForm;
