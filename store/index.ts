import { create } from "zustand";
import { siteConfig } from "@/config/site";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { LoginInfo } from "@/lib/type";
import { MenuItemProps } from "@/config/menus";
import axios from "axios";
import { getUrl } from "@/hooks/utility";
interface ThemeStoreState {
  menu: MenuItemProps[];
  setMenu: (value: MenuItemProps[]) => void;
  user: LoginInfo;
  setUser: (value: LoginInfo) => void;
  theme: string;
  setTheme: (theme: string) => void;
  radius: number;
  setRadius: (value: number) => void;
  layout: string;
  setLayout: (value: string) => void;
  navbarType: string;
  setNavbarType: (value: string) => void;
  footerType: string;
  setFooterType: (value: string) => void;
  isRtl: boolean;
  setRtl: (value: boolean) => void;
}

export const useThemeStore = create<ThemeStoreState>()(
  devtools(
    persist(
      (set) => ({
        menu: [],
        setMenu: (value: MenuItemProps[]) => set({ menu: value }),
        user: {
          userId: null,
          username: null,
          organizationId: null,
          refreshToken: null,
          token: null,
        },
        setUser: (value) => set({ user: value }),
        theme: siteConfig.theme,
        setTheme: (theme) => set({ theme }),
        radius: siteConfig.radius,
        setRadius: (value) => set({ radius: value }),
        layout: siteConfig.layout,
        setLayout: (value) => {
          set({ layout: value });
          // If the new layout is "semibox," also set the sidebarType to "module"
          if (value === "semi-box") {
            useSidebar.setState({ sidebarType: "popover" });
          }
          if (value === "horizontal") {
            useSidebar.setState({ sidebarType: "module" });
          }
          //
          if (value === "horizontal") {
            // update  setNavbarType
            useThemeStore.setState({ navbarType: "sticky" });
          }
        },
        navbarType: siteConfig.navbarType,
        setNavbarType: (value) => set({ navbarType: value }),
        footerType: siteConfig.footerType,
        setFooterType: (value) => set({ footerType: value }),
        isRtl: true,
        setRtl: (value) => set({ isRtl: value }),
      }),
      { name: "theme-store", storage: createJSONStorage(() => localStorage) }
    )
  )
);

interface SidebarState {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  sidebarType: string;
  setSidebarType: (value: string) => void;
  subMenu: boolean;
  setSubmenu: (value: boolean) => void;
  // background image
  sidebarBg: string;
  setSidebarBg: (value: string) => void;
  mobileMenu: boolean;
  setMobileMenu: (value: boolean) => void;
}

export const useSidebar = create<SidebarState>()(
  devtools(
    persist(
      (set) => ({
        collapsed: false,
        setCollapsed: (value) => set({ collapsed: value }),
        sidebarType: siteConfig.layout === "semi-box" ? "popover" : "popover",
        setSidebarType: (value) => {
          set({ sidebarType: value });
        },
        subMenu: false,
        setSubmenu: (value) => set({ subMenu: value }),
        // background image
        sidebarBg: siteConfig.sidebarBg,
        setSidebarBg: (value) => set({ sidebarBg: value }),
        mobileMenu: false,
        setMobileMenu: (value) => set({ mobileMenu: value }),
      }),
      { name: "sidebar-store", storage: createJSONStorage(() => localStorage) }
    )
  )
);
interface UserState {
  token?: string;
  setToken: (value: string) => void;
  organizationId?: number | null;
  userId?: number | null;
  setOrganizationId: (value: number) => void;
  setUserId: (value: number) => void;
  clearToken: () => void;
}
export const useAuthStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        token: "",
        organizationId: null,
        setToken: (token: string) => set({ token }),
        setOrganizationId: (organizationId: number) => set({ organizationId }),
        setUserId: (userId: number) => set({ userId }),
        clearToken: () => set({ token: "" }),
      }),
      { name: "user", storage: createJSONStorage(() => localStorage) }
    )
  )
);

interface PickerState {
  pickers: { [key: string]: any };
  isLoading: boolean;
  error: boolean;
  isSuccess: boolean;
  loadPicker: (params: { url: string; picker: string; token: string }) => Promise<void>;
  loadSelectorOptions: (params: { url: string; picker: string; token: string }) => Promise<void>;
}
export const usePickerStore = create<PickerState>((set) => {
  return {
    pickers: {},
    isLoading: false,
    error: false,
    isSuccess: false,

    loadPicker: async ({ url, picker, token }) => {
      if (picker) {
        try {
          set({ isLoading: true });

          const response = await axios.get(getUrl(url), {
            headers: { Authorization: token },
          });
          console.log(response);
          set((state) => ({
            isSuccess: true,
            pickers: {
              ...state.pickers,
              [picker]: response.data.content,
            },
          }));
        } catch (error) {
          console.error("Error fetching picker:", error);
          set({ isLoading: false, error: true });
          throw error;
        }
      }
    },

    loadSelectorOptions: async ({ url, picker, token }) => {
      try {
        set({ isLoading: true });
        const response = await axios.get(getUrl(url), {
          headers: { Authorization: token },
        });
        const mappedList = response.data.content.map((el: any) => ({
          value: parseInt(el.id),
          label: el.fullTitle ? el.fullTitle : el.name,
        }));
        set((state) => ({
          isSuccess: true,
          pickers: {
            ...state.pickers,
            [picker]: mappedList,
          },
        }));
      } catch (error) {
        console.error("Error fetching picker:", error);
        set({ isLoading: false, error: true });
      }
    },
  };
});
