"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Icon } from "@iconify/react";

import { useState } from "react";
import AddBlock from "../common/add-block";
import { useThemeStore } from "@/store";
import { useRouter } from "next/navigation";
const LogoutFooter = () => {
  const { setUser } = useThemeStore();
  const route = useRouter();


  return (
    <>
      <AddBlock />

      <div className=" bg-default-50 dark:bg-default-200 items-center flex gap-3  px-4 py-2 mt-5">
        <div className="flex-1">
          <div className=" text-default-700 font-semibold text-sm capitalize mb-0.5 truncate">
            ویونا
          </div>
          <div className=" text-xs text-default-600  truncate">
          info@viuna-ict.com
          </div>
        </div> 
        <div className=" flex-none">
          <button
            type="button"
            onClick={() => {
              route.push("/auth/login");
              setUser({});
            }}
            className="  text-default-500 inline-flex h-9 w-9 rounded items-center  dark:bg-default-300 justify-center dark:text-default-900"
          >
            <Icon
              icon="heroicons:arrow-right-start-on-rectangle-20-solid"
              className=" h-5 w-5"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default LogoutFooter;
