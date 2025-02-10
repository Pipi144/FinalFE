import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { getCookie, setCookie, deleteCookie } from "cookies-next/client";
import { COOKIES_KEYS } from "@/utils/cookies";
import { TUser } from "@/models/user";

type TAuthStore = {
  currentUser: TUser | null;
  setCurrentUser: (user: TUser | null) => void;
  removeUser: () => void;
};

//  Custom Cookie Storage
const cookieStorage = {
  getItem: (key: string) => {
    const value = getCookie(key);
    return value ? JSON.parse(value) : null;
  },
  setItem: (key: string, value: any) => {
    setCookie(key, JSON.stringify(value), { maxAge: 60 * 60 * 24 * 30 }); // ✅ 30 days expiry
  },
  removeItem: (key: string) => {
    deleteCookie(key);
  },
};

//  Zustand store with persist & cookies
export const useAuthStore = create(
  persist(
    immer<TAuthStore>((set) => ({
      currentUser: cookieStorage.getItem(COOKIES_KEYS.CurrentUser), // ✅ Load from cookie initially
      setCurrentUser: (user) =>
        set((state) => {
          state.currentUser = user;
          cookieStorage.setItem(COOKIES_KEYS.CurrentUser, user);
        }),
      removeUser: () =>
        set((state) => {
          cookieStorage.removeItem(COOKIES_KEYS.CurrentUser);
          state.currentUser = null;
        }),
    })),
    {
      name: COOKIES_KEYS.CurrentUser, // ✅ Persist Key
      storage: cookieStorage, // ✅ Use cookieStorage instead of localStorage
    }
  )
);
