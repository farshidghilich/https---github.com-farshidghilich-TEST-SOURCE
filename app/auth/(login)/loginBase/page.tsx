"use client";
import LogInForm from "../login/login-form";
import Icon from "@/public/images/all-img/LoginIcon.png";
import { SiteLogo } from "@/components/svg";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";
import Image from "next/image";
import logoViuena from "@/public/images/all-img/لگو ویونا.jpg";
const LoginPage = () => {
  const { theme: config, setTheme: setConfig, isRtl } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);

  return (
    <div className="loginwrapper  bg-primary  flex  justify-center items-center" dir="rtl">
      <div
        className="flex flex-col gap-4 justify-center bg-background my-10 p-10 2xl:my-20 m-4 w-fit overflow-hidden xl:w-[calc(100vw-80px)]   2xl:w-[calc(100vw-160px)]  2xl:px-20 2xl:py-12 rounded-3xl  
      "
      >
        <div className="relative  rounded-xl">
          <div className="flex flex-col xl:flex-row items-center w-full gap-y-12">
            <div className="basis-full xl:basis-1/2 w-full">
              <div className="w-full  xl:w-[480px]  relative z-20">
                <LogInForm />
              </div>
            </div>
            <div className="basis-full xl:basis-1/2 hidden xl:block relative w-[500px] ">
              <svg
                className="absolute top-0 -right-0 "
                width="1208"
                height="580"
                viewBox="0 0 1208 1080"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter
                    id="filter0_f_4801_13605"
                    x="0"
                    y="-39"
                    width="1208"
                    height="1208"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur_4801_13605" />
                  </filter>
                  <radialGradient
                    id="paint0_radial_4801_13605"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(805.322 373.168) rotate(134.675) scale(1098.13)"
                  >
                    <stop stop-color="#826AF9" stop-opacity="0.6" />
                    <stop offset="1" stop-color="#826AF9" stop-opacity="0" />
                  </radialGradient>
                </defs>
              </svg>
              <div className="bg-primary h-full w-full rounded-3xl rounded-tl-none  xl:p-[60px] ltr:xl:pr-9 rtl:xl:pl-9 relative  overflow-hidden">
                <svg
                  className="absolute -top-[0px] -left-[50px] hidden lg:block [&>*]:fill-background"
                  width="209"
                  height="162"
                  viewBox="0 0 209 162"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ transform: " rotate(270deg)" }}
                >
                  <path
                    d="M62 25H0V0H209V162H185C184.317 129.162 169.576 122.271 158.235 120.921H121.512C100.402 119.676 90.7287 104.351 90.7287 93.7286V57.8571C89.4326 35.64 71.0009 26.7357 62 25Z"
                    fill="currentColor"
                  />
                </svg>

                <div className="text-2xl lg:text-3xl xl:text-5xl font-semibold text-primary-foreground">
                  درباره سامانه <span className="xl:block"></span>
                </div>

                <div className="text-lg  mt-2 text-primary-foreground flex gap-1">
                  سامانه جامع مسافر جاده‌ای با هدف بهبود تجربه سفر، افزایش ایمنی و کارایی در حمل‌ونقل جاده‌ای، مجموعه‌ای
                  از اهداف مشخص را دنبال می‌کند. این اهداف را می‌توان در چند دسته اصلی جای داد:
                </div>

                <div className="bg-card overflow-hidden w-full  rounded-3xl rounded-tl-none  relative mt-11 pt-8 pb-7 pl-4">
                  <div className="h-[72px] w-[72px] rounded-full  bg-background flex justify-center items-center absolute left-0 top-0 z-10">
                    <Image src={logoViuena} alt="siteLogo" className="w-15 h-15 text-yellow-400" />
                  </div>
                  <svg
                    className="absolute -top-[1px] -left-[50px] [&>*]:fill-primary"
                    width="209"
                    height="162"
                    viewBox="0 0 209 162"
                    fill="none"
                    style={{ transform: " rotate(270deg)" }}
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M62 25H0V0H209V162H185C184.317 129.162 169.576 122.271 158.235 120.921H121.512C100.402 119.676 90.7287 104.351 90.7287 93.7286V57.8571C89.4326 35.64 71.0009 26.7357 62 25Z"
                      fill="currentColor"
                    />
                  </svg>
                  <div className="w-[90%] mx-auto">
                    <Swiper
                      key={`${isRtl}-swiper`}
                      dir={isRtl ? "rtl" : "ltr"}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[Autoplay, Pagination, Navigation]}
                      style={
                        {
                          "--swiper-pagination-color": `hsl(${
                            theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
                          })`,
                          "--swiper-pagination-bottom": "0px",
                          "--swiper-pagination-bullet-size": "12px",
                          "--swiper-pagination-bullet-inactive-color": `hsl(${
                            theme?.cssVars[mode === "dark" ? "dark" : "light"].primary
                          })`,
                          "--swiper-pagination-bullet-inactive-opacity": 0.5,
                        } as React.CSSProperties
                      }
                      className="w-full h-full rounded-2xl "
                    >
                      <SwiperSlide>
                        <div className="ltr:pl-4 rtl:pr-8 pb-10">
                          <div className="text-lg lg:text-xl  font-semibold text-default-900">
                            یکپارچه‌سازی داده‌ها: <br />
                          </div>
                          <div className="text-lg  text-default-800 mt-10">
                            جمع‌آوری و یکپارچه‌سازی داده‌های مختلف از منابع متنوع برای ارائه خدمات بهتر
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="ltr:pl-4 rtl:pr-8 pb-10">
                          <div className="text-lg lg:text-xl  font-semibold text-default-900 ">
                            شخصی‌سازی خدمات: <br />
                          </div>
                          <div className="text-lg  text-default-800 mt-10">
                            ارائه خدمات سفارشی‌سازی شده بر اساس نیازهای هر مسافر
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="ltr:pl-4 rtl:pr-8  pb-10">
                          <div className="text-lg lg:text-xl  font-semibold text-default-900 ">
                            ایجاد اکوسیستمی از خدمات <br />
                          </div>
                          <div className="text-lg  text-default-800 mt-10">
                            ایجاد یک اکوسیستم کامل از خدمات مرتبط با سفر از جمله رزرو بلیط، خرید بلیط، توشه همراه و غیر
                            همراه، قانون گذاری ، رتبه بندی شرکت ها، نظر سنجی مسافرین، ثبت شکایات و ...
                          </div>
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="ltr:pl-4 rtl:pr-8  pb-10">
                          <div className="text-lg lg:text-xl  font-semibold text-default-900 ">
                            توسعه زیرساخت‌های هوشمند
                            <br />
                          </div>
                          <div className="text-lg  text-default-800 mt-10">
                            ایجاد زیرساخت‌های هوشمند مانند سپهتن، دوربینهای کنترل سرعت، مانیتورینگ سفرها، تنظیم مقررات و
                            قانونگذاری متمرکز در سطح کشور
                          </div>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
