import React from "react";
import { FileCheck, Search } from "lucide-react";
import { SiteLogo } from "@/components/svg";
import Link from "next/link";
import Image from "next/image";
const horizontalHeader = ({ handleOpenSearch }: { handleOpenSearch: () => void; }) => {
  return (
    <div className="flex items-center lg:gap-12 gap-3 ">
      <div>
        <Link
          href="/"
          className=" text-primary flex items-center gap-2"
        >
          <Image src={SiteLogo} alt="site logo" className="h-7 w-7" />
          <span className=" text-xl font-semibold lg:inline-block hidden">
            {" "}
            سامانه جامع حمل و نقل مسافری
          </span>
        </Link>
      </div>
      <Link href='/Statement' className="flex flex-col items-center justify-center">
          <FileCheck
            className="h-6 w-6  cursor-pointer"
          />
          <p className="mb-0 mt-1.5 text-xs text-default-600">صورت وضعیت</p>
        </Link>
    </div>
  );
};

export default horizontalHeader;
