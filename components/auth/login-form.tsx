"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { SiteLogo } from "@/components/svg";
import { Icon } from "@iconify/react";
import { Checkbox } from "@/components/ui/checkbox";

import googleIcon from "@/public/images/auth/google.png";
import facebook from "@/public/images/auth/facebook.png";
import twitter from "@/public/images/auth/twitter.png";
import GithubIcon from "@/public/images/auth/github.png";

const schema = z.object({
  username: z.string(),
  password: z.string().min(4),
});
import { useMediaQuery } from "@/hooks/use-media-query";
import axios from "axios";
import { useThemeStore } from "@/store";
import { LoginInfo } from "@/lib/type";
import { getUrl } from "@/hooks/utility";

const LogInForm = () => {
  const { setUser } = useThemeStore();
  const [isPending, startTransition] = React.useTransition();
  const [passwordType, setPasswordType] = React.useState("password");
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");
  const [loginResponse, setLoginResponse] = React.useState<LoginInfo>({
    userId: null,
    username: null,
    organizationId: null,
    refreshToken: null,
    token: null,
  });
  const togglePasswordType = () => {
    if (passwordType === "text") {
      setPasswordType("password");
    } else if (passwordType === "password") {
      setPasswordType("text");
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      username: "tezi",
      password: "123421",
    },
  });
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const onSubmit = (data: { username: string; password: string }) => {
    axios
      .post(getUrl("v1/uac/auth/signIn"), data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setUser(res.data);
        toast.success("Login Successful");
        // window.location.assign("/fa");
      });
  };
  // const menuAsync = async () => {
  //   const { data } = await axios.get(baseurl+"/v1/uac/menu/getUsersMenu", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${res.token}`,
  //     },
  //   });
  //   console.log(data);
  //   const dynamicMenu = data
  //     ?.map((item) => {
  //       const content = data
  //         .filter((data) => {
  //           return data.parentId == item.id;
  //         })
  //         .map((el) => {
  //           return {
  //             id: el.id,
  //             orderNode: el.orderNode,
  //             icon: "icon-home",
  //             label: el.name,
  //             to: `/${el.path}`,
  //           };
  //         })
  //         .sort((a, b) => a.orderNode - b.orderNode);

  //       return {
  //         id: item.id,
  //         icon: "icon-home",

  //         label: item.name,
  //         to: `/${item.path}`,
  //         content: content.length === 0 ? undefined : content,
  //       };
  //     })
  //     ?.filter((item) => item.content !== undefined);

  //   console.log(dynamicMenu);
  //   const dashboard = {
  //     id: 11,
  //     icon: "icon-speedometer",
  //     label: "داشبورد ",
  //     to: "/",
  //   };
  //   if (dynamicMenu) {
  //     dynamicMenu.unshift(dashboard);
  //   }
  //   dispatch(MenuAction(dynamicMenu));
  //   localStorage.setItem("menu", JSON.stringify(data));

  //   setTimeout(() => {
  //     if (data) {
  //       navigate("/");
  //     }
  //   }, 220);
  // };

  return (
    <div className="w-full py-10">
      <Link href="/dashboard" className="inline-block">
        <Image src={SiteLogo} alt="site logo" className="h-10 w-10 2xl:w-14 2xl:h-14 text-primary" />
      </Link>
      <div className="2xl:mt-8 mt-6 2xl:text-3xl text-2xl font-bold text-default-900">Hey, Hello 👋</div>
      <div className="2xl:text-lg text-base text-default-600 2xl:mt-2 leading-6">
        Enter the information you entered while registering.
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 2xl:mt-7">
        <div>
          <Label htmlFor="username" className="mb-2 font-medium text-default-600">
            username
          </Label>
          <Input
            disabled={isPending}
            {...register("username")}
            type="username"
            id="username"
            className={cn("", {
              "border-destructive": errors.username,
            })}
            size={!isDesktop2xl ? "xl" : "lg"}
          />
        </div>
        {errors.username && <div className=" text-destructive mt-2">{errors.username.message}</div>}

        <div className="mt-3.5">
          <Label htmlFor="password" className="mb-2 font-medium text-default-600">
            Password{" "}
          </Label>
          <div className="relative">
            <Input
              disabled={isPending}
              {...register("password")}
              type={passwordType}
              id="password"
              className="peer "
              size={!isDesktop2xl ? "xl" : "lg"}
              placeholder=" "
            />

            <div
              className="absolute top-1/2 -translate-y-1/2 ltr:right-4 rtl:left-4 cursor-pointer"
              onClick={togglePasswordType}
            >
              {passwordType === "password" ? (
                <Icon icon="heroicons:eye" className="w-5 h-5 text-default-400" />
              ) : (
                <Icon icon="heroicons:eye-slash" className="w-5 h-5 text-default-400" />
              )}
            </div>
          </div>
        </div>
        {errors.password && <div className=" text-destructive mt-2">{errors.password.message}</div>}

        <div className="mt-5  mb-8 flex flex-wrap gap-2">
          <div className="flex-1 flex  items-center gap-1.5 ">
            <Checkbox size="sm" className="border-default-300 mt-[1px]" id="isRemebered" />
            <Label htmlFor="isRemebered" className="text-sm text-default-600 cursor-pointer whitespace-nowrap">
              Remember me
            </Label>
          </div>
          <Link href="/auth/forgot" className="flex-none text-sm text-primary">
            Forget Password?
          </Link>
        </div>
        <Button className="w-full" disabled={isPending} size={!isDesktop2xl ? "lg" : "md"}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? "صبر کنید..." : "Sign In"}
        </Button>
      </form>
      <div className="mt-6 xl:mt-8 flex flex-wrap justify-center gap-4">
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="rounded-full  border-default-300 hover:bg-transparent"
          disabled={isPending}
          onClick={() =>
            signIn("google", {
              callbackUrl: "/dashboard",
            })
          }
        >
          <Image src={googleIcon} alt="google" className="w-5 h-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="rounded-full  border-default-300 hover:bg-transparent"
          disabled={isPending}
          onClick={() =>
            signIn("github", {
              callbackUrl: "/dashboard",
              redirect: false,
            })
          }
        >
          <Image src={GithubIcon} alt="google" className="w-5 h-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="rounded-full border-default-300 hover:bg-transparent"
        >
          <Image src={facebook} alt="google" className="w-5 h-5" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="outline"
          className="rounded-full  border-default-300 hover:bg-transparent"
        >
          <Image src={twitter} alt="google" className="w-5 h-5" />
        </Button>
      </div>
      <div className="mt-5 2xl:mt-8 text-center text-base text-default-600">
        Don't have an account?{" "}
        <Link href="/auth/register" className="text-primary">
          {" "}
          Sign Up{" "}
        </Link>
      </div>
    </div>
  );
};

export default LogInForm;
