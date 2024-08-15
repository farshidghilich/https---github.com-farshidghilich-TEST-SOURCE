import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import ScreenShot from "@/public/images/landing-page/screenshot.png";
import DashboardSceenshot from "@/public/images/landing-page/-screenshot.png";
import ProfileScreenShot from "@/public/images/landing-page/profile-screenshot.png";
import CalenderScreenshot from "@/public/images/landing-page/calender-screenshot.png";

const Hero = () => {
  return (
    <section
      className="bg-[url(https://dashboi-one.vercel.app/images/home/hero-bg.png)] bg-cover bg-no-repeat relative"
      id="home"
    >
      <div className="bg-gradient-to-b from-primary/30 to-[#fff] dark:from-primary/20 dark:to-[#0F172A]">
        <div className="container">
          <div className=" relative z-10">
            <div className="pt-32 md:pt-48">
              <h1 className="max-w-[600px] mx-auto text-xl md:text-2xl xl:text-4xl xl:leading-[52px] font-semibold text-default-900 text-center">
                <span className="text-primary">DashTail</span> - Tailwind, React Next Admin Dashboard Template
              </h1>
              <p className="text-base leading-7 md:text-lg md:leading-8 text-default-700 text-center mt-5 max-w-[800px] mx-auto">
                DashTail is a developer-friendly, ready-to-use admin template designed for building attractive,
                scalable, and high-performing web applications, powered by the cutting-edge technologies of Next.js and
                Tailwind CSS.
              </p>
              <div className="flex mt-9 justify-center gap-4 lg:gap-8">
                <Button asChild size="xl">
                  <Link href="/"> View Demo </Link>
                </Button>
                <Button asChild variant="outline" size="xl">
                  <Link href="https://dash-tail.vercel.app/docs/introduction" target="_blank">
                    Documentation
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <Image src={DashboardSceenshot} className="relative lg:hidden mt-10" alt="screenshot" />
          <div className="relative  -mt-20 hidden lg:block">
            <Image src={ScreenShot} alt="screenshot" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
