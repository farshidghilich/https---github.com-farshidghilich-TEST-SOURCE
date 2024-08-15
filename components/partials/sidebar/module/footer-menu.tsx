import React from "react";
import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings } from "@/components/svg";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import avatar5 from "@/public/images/all-img/لگو ویونا.jpg";
const FooterMenu = () => {

  return (
    <div className="space-y-5 flex flex-col items-center justify-center pb-6">
      <div>


        <Image
          src={avatar5}
          alt=""
          width={36}
          height={36}
          className="rounded-full"
        />

      </div>
    </div>
  );
};
export default FooterMenu;
