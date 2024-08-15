"use client";
import React from "react";
import ThemeCustomize from "../customizer/theme-customizer";
import { MenuBar, Settings, SiteLogo } from "@/components/svg";
import {FileCheck} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
const MobileFooter = ({
}: {
  handleOpenSearch: () => void;
}) => {
  return (
    <div className=" mx-4 mb-6">
      <footer
        className="bg-card py-4 px-6 rounded-md border ltr:xl:ml-[272px] rtl:xl:mr-[272px] fixed bottom-0 flex justify-around"
        style={{  borderRadius: "15px" , width:"92%" , marginBottom:"0.5em" }}
      >
        <Link href='/Statement' className="flex flex-col items-center justify-center">
          <FileCheck
            className="h-6 w-6  cursor-pointer"
          />
          <p className="mb-0 mt-1.5 text-xs text-default-600">صورت وضعیت</p>
        </Link>
        <div className="relative shadow-[0_-4px_10px_#9595952b] dark:shadow-[0_-4px_10px_#0000004d] bg-card border-t dark:border-none bg-no-repeat backdrop-filter backdrop-blur-[40px] rounded-full footer-bg  h-[70px] w-[70px] z-[-1] -mt-[40px] flex justify-center items-center">
          <div className="rounded-full bg-primary p-3 h-[60px] w-[60px] flex items-center justify-center  relative left-0 top-0 custom-dropshadow  text-center">
            <Link href="/">
              <Image src={SiteLogo} alt="site logo" className="h-8 w-8  text-primary-foreground" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <ThemeCustomize
            trigger={<Settings className="h-6 w-6  cursor-pointer" />}
          />
          <p className="mb-0 mt-1.5 ml-5 text-xs text-default-600"> تنظیمات تم</p>
        </div>
      </footer>
    </div>
  );
};

export default MobileFooter;
