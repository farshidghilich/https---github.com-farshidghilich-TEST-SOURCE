import React from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, TooltipArrow } from "@/components/ui/tooltip";
import Link from "next/link";
import { translate } from "@/lib/utils";
import { DashBoard } from "@/components/svg";
const SingleIconMenu = ({
  index,
  activeIndex,
  item,
  locationName,
  trans,
}: {
  index: number;
  activeIndex: number | null;
  item: any;
  locationName: string;
  trans: any;
}) => {
  const { icon, title, href } = item;
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {href ? (
              <span
                className={cn(
                  "h-12 w-12 mx-auto rounded-md  transition-all duration-300 flex flex-col items-center justify-center cursor-pointer relative",
                  {
                    "bg-primary/10  text-primary": locationName === href,
                    "text-default-500 dark:text-default-400 hover:bg-primary/10  hover:text-primary ":
                      locationName !== href,
                  }
                )}
              >
                <DashBoard className="w-8 h-8" />
              </span>
            ) : (
              <button
                className={cn(
                  "h-12 w-12 mx-auto rounded-md transition-all duration-300 flex flex-col items-center justify-center cursor-pointer relative  ",
                  {
                    "bg-primary/10 dark:bg-primary dark:text-primary-foreground  text-primary data-[state=delayed-open]:bg-primary/10 ":
                      activeIndex === index,
                    " text-default-500 dark:text-default-400 data-[state=delayed-open]:bg-primary/10  data-[state=delayed-open]:text-primary":
                      activeIndex !== index,
                  }
                )}
              >
                <DashBoard className="w-6 h-6" />
              </button>
            )}
          </TooltipTrigger>
          <TooltipContent side="right" className=" capitalize">
            {translate(title, trans)}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default SingleIconMenu;
