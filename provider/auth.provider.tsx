"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check the version of the browser
      const userAgent = navigator.userAgent;
      const browserInfo =
        userAgent.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        ) || [];
      const getBrowserName = (ua: string) => {
        const userAgent = ua.toLowerCase();
        if (userAgent.includes("opr") || userAgent.includes("opera")) {
          return "Opera";
        } else if (userAgent.includes("chrome")) {
          return "Chrome";
        } else if (userAgent.includes("safari")) {
          return "Safari";
        } else if (userAgent.includes("firefox")) {
          return "Firefox";
        }
        return "Unknown";
      };
      const getBrowserVersion = (ua: string, browser: string) => {
        const version = ua.match(new RegExp(browser + "\\/([\\d.]+)")) || [];
        return version.length > 1 ? parseInt(version[1]) : 0;
      };
      const browserName = getBrowserName(userAgent);
      const browserVersion = getBrowserVersion(userAgent, browserName);
      const supportedVersions = {
        Chrome: 64,
        Edge: 79,
        Firefox: 67,
        Opera: 51,
        Safari: 12,
        Unknown: 10000,
      };

      if (browserVersion < supportedVersions[browserName]) {
        toast.error(
          ` ورژن مرورگر ${
            browserName === "Chrome"
              ? "کروم"
              : browserName === "Firefox"
              ? "فایرفاکس"
              : browserName === "Safari"
              ? "سافاری"
              : browserName === "Opera"
              ? "اوپرا"
              : "مرورگر"
          } شما پشتبانی نمی شود. لطفا مرورگر خود را ارتقا دهید.`,
          {
            style: {
              direction: "rtl", // Set text direction to RTL
            },
          }
        );
      }
    }
  }, []);
  return <>{children}</>;
};

export default AuthProvider;
