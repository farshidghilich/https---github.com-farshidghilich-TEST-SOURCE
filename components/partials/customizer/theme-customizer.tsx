"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ThemeChange from "./theme-change";
import logoViuena from "@/public/images/all-img/لگو ویونا.jpg";
import SidebarImage from "./sidebar-image";
import SelectLayout from "./select-layout";
import SelectTheme from "./select-theme";
import HeaderStyle from "./header-style";
import FooterStyle from "./footer-style";
import RtlSwitcher from "./rtl-switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import RadiusInit from "./radius";
import { Settings } from "@/components/svg";
import Link from "next/link";
import { useThemeStore } from "@/store";
import Image from "next/image";

const ThemeCustomize = ({
  trigger = (
    <div style={{ cursor: "pointer" }}>
      <Settings className="h-6 w-6" />
    </div>
  ),
}) => {
  const { isRtl } = useThemeStore();

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side={isRtl ? "left" : "right"}
        overlayClass=" bg-transparent backdrop-blur-none"
        className="lg:w-3/4 w-full max-w-full md:max-w-sm px-6 pt-0 pb-6"
      >
        <SheetHeader className=" text-start border-b -mx-6 px-6 py-4 shadow-sm md:shadow-none">
          <SheetTitle
            className=" text-base  font-medium "
            style={{ textAlign: "center" }}
          >
            شخصی سازی استایل
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100%-120px)] -mx-6 px-6">
          <div className=" space-y-8 mt-3">
            <SelectLayout />
            <SelectTheme />
            <ThemeChange />
            <SidebarImage />
            <RadiusInit />
            <HeaderStyle />
            <FooterStyle />
          </div>
        </ScrollArea>
        <SheetFooter
          className="py-4 gap-3 lg:flex justify-center hidden"
          style={{
            justifyContent: "center",
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image src={logoViuena} alt="لگو ویونا" width={40} />
          <div style={{ fontWeight: "bolder" }}>
            با افتخار، شرکت داده پردازان گستر ویونا
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ThemeCustomize;
