"use client";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import avatar5 from "@/public/images/all-img/لگو ویونا.jpg";
import { useThemeStore } from "@/store";
const ProfileInfo = () => {
  const { setUser } = useThemeStore();
  const route = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className=" cursor-pointer">
        <div className=" flex items-center  ">
          <Image src={avatar5} alt="" width={36} height={36} className="rounded-full" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-0" align="end">
        <DropdownMenuLabel className="flex gap-2 items-center mb-1 p-3">
          <Image src={avatar5} alt="" width={36} height={36} className="rounded-full" />
          <div>
            <div className="text-sm font-medium text-default-800 capitalize ">{"ویونا"}</div>
            <Link href="/" className="text-xs text-default-600 hover:text-primary">
              info@viuna-ict.com
            </Link>
          </div>
        </DropdownMenuLabel>
        {/* <DropdownMenuGroup>
          {[
            {
              name: "پروفایل",
              icon: "heroicons:user",
              href: "/user-profile",
            },
            {
              name: "صورتحساب",
              icon: "heroicons:megaphone",
              href: "/",
            },
            {
              name: "تنظیمات",
              icon: "heroicons:paper-airplane",
              href: "/",
            },
          ].map((item, index) => (
            <Link href={item.href} key={`info-menu-${index}`} className="cursor-pointer">
              <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
                <Icon icon={item.icon} className="w-4 h-4" />
                {item.name}
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/" className="cursor-pointer">
            <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
              <Icon icon="heroicons:user-group" className="w-4 h-4" />
              کاربران
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background">
              <Icon icon="heroicons:user-plus" className="w-4 h-4" />
              ارتباط با کاربر
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {[
                  {
                    name: "ایمیل",
                  },
                  {
                    name: "پیام",
                  },
                  {
                    name: "تماس",
                  },
                ].map((item, index) => (
                  <Link href="/" key={`message-sub-${index}`} className="cursor-pointer">
                    <DropdownMenuItem className="text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
                      {item.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
              <Icon icon="heroicons:phone" className="w-4 h-4" />
              پشتیبانی
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {[
                  {
                    name: "درون سازمانی",
                  },
                  {
                    name: "تماس",
                  },
                  {
                    name: "ایتا",
                  },
                ].map((item, index) => (
                  <Link href="/" key={`message-sub-${index}`}>
                    <DropdownMenuItem className="text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
                      {item.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup> */}
        <DropdownMenuSeparator className="mb-0 dark:bg-background" />
        <DropdownMenuItem
          onSelect={() => signOut()}
          className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize my-1 px-3 dark:hover:bg-background cursor-pointer"
          style={{ color: "red" }}
          onClick={() => {
            route.push("/auth/login");
            // localStorage.removeItem("token");
            setUser({});
          }}
        >
          <Icon icon="heroicons:power" className="w-4 h-4" />
          خروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ProfileInfo;
