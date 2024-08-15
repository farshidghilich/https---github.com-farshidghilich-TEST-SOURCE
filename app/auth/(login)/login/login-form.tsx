"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { DashBoard, SiteLogo, MeyarLogo } from "@/components/svg";
import { useMediaQuery } from "@/hooks/use-media-query";
import axios from "axios";
import { useAuthStore, useThemeStore } from "@/store";
import { MenuItemProps } from "@/config/menus";
import { getUrl } from "@/hooks/utility";
import Cookies from "js-cookie";
import Image from "next/image";

const schema = z.object({
  username: z.string(),
  password: z.string().min(4),
});
interface LoginFormValues {
  username: string;
  password: string;
}
const LogInForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState<string>("password");
  const [rememberMe, setRememberMe] = useState<boolean>(false); // وضعیت مرا به خاطر بسپار
  const isDesktop2xl = useMediaQuery("(max-width: 1530px)");
  const { setMenu } = useThemeStore();
  const { setToken, setOrganizationId, setUserId } = useAuthStore();

  const togglePasswordType = () => {
    setPasswordType(passwordType === "text" ? "password" : "text");
  };

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    mode: "all",
  });
  const onSubmit: SubmitHandler<LoginFormValues> = async (data: { username: string; password: string }) => {
    try {
      setLoading(true);
      const { username, password } = data;

      await axios
        .post(
          getUrl(`v1/uac/auth/signIn`),
          { username, password },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then(async (R) => {
          const dynamicMenu: MenuItemProps[] = await axios
            .get(getUrl(`v1/uac/menu/getUsersMenu`), {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${R.data.token}`,
              },
            })
            .then((Res) => {
              return Res.data
                ?.map((item: any) => {
                  const content = Res.data
                    .filter((data: any) => data.parentId === item.id)
                    .map((el: any) => ({
                      title: el.name,
                      id: item.id,
                      icon: DashBoard,
                      href: `/${el.path}`,
                      orderNode: el.orderNode,
                    }))
                    .sort((a: any, b: any) => a.orderNode - b.orderNode);

                  return {
                    title: item.name,
                    icon: DashBoard,
                    orderNode: item.orderNode,
                    href: `/${item.path}`,
                    child: content.length === 0 ? undefined : content,
                  };
                })
                .filter((item: any) => item.child !== undefined)
                .sort((a: any, b: any) => a.orderNode - b.orderNode);
            });

          setMenu(dynamicMenu);
          setToken(R.data.token);
          setOrganizationId(R.data.organizationId);
          setUserId(R.data.userId);

          // ذخیره توکن در کوکی
          Cookies.set("token", R.data.token, { expires: rememberMe ? 7 : 1 });

          toast.success("خوش آمدید");
          setTimeout(() => {
            router.push("/");
          }, 300);
        })
        .catch((e: Error) => {
          setLoading(false);
          toast.error("نام کاربری یا رمز عبور اشتباه است !");
        });
    } catch (error) {
      toast.error("خطا در برقرای ارتباط با سرور");
    }
  };

  return (
    <div className="w-full py-5 lg:py-10">
      <Image src={MeyarLogo} alt="site logo" className="h-20 w-40 text-primary text-center m-auto" />
      <div className="2xl:mt-8 mt-6 2xl:text-2xl text-2xl font-bold text-default-900">
        سامانه مدیریت عملکرد یکپارچه اهداف راهبردی
      </div>
      <div className="2xl:text-lg text-base text-default-600 mt-2 leading-6">
        نام کاربری و روز عبور خود را وارد کنید
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 xl:mt-7">
        <div className="relative">
          <Label htmlFor="username" className="mb-2 font-medium text-default-600">
            نام کاربری
          </Label>
          <Input
            disabled={loading}
            {...register("username")}
            type="username"
            id="username"
            className={cn("peer", { "border-destructive": errors.username })}
            size={!isDesktop2xl ? "xl" : "lg"}
            placeholder=""
          />
        </div>
        {errors.username && <div className=" text-destructive mt-2">{errors.username.message}</div>}
        <div className="mt-3.5">
          <Label htmlFor="password" className="mb-2 font-medium text-default-600">
            کلمه عبور
          </Label>
          <div className="relative">
            <Input
              disabled={loading}
              {...register("password")}
              type={passwordType}
              id="password"
              className="peer"
              size={!isDesktop2xl ? "xl" : "lg"}
              placeholder=""
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
        {errors.password && <div className=" text-destructive mt-2">رمز عبور می بایست حداقل 4 کاراکتر باشد</div>}
        <div className="mt-5 mb-8 flex flex-wrap gap-2">
          <div className="flex-1 flex items-center gap-1.5">
            <Checkbox
              size="sm"
              className="border-default-300 mt-[1px]"
              id="isRemebered"
              defaultChecked={rememberMe}
              onCheckedChange={(e: boolean) => {
                setRememberMe(e);
              }}
            />
            <Label htmlFor="isRemebered" className="text-sm text-default-600 cursor-pointer whitespace-nowrap">
              مرا به خاطر بسپار
            </Label>
          </div>
        </div>
        <Button className="w-full" disabled={loading} size={!isDesktop2xl ? "lg" : "md"}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "لطفا منتظر بمانید..." : "ورود"}
        </Button>
      </form>
    </div>
  );
};

export default LogInForm;
