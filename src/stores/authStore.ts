import { TUser } from "@/models/user";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  getCookie,
  getCookies,
  setCookie,
  deleteCookie,
  hasCookie,
  useGetCookies,
  useSetCookie,
  useHasCookie,
  useDeleteCookie,
  useGetCookie,
} from "cookies-next/client";
import { COOKIES_KEYS } from "@/utils/cookies";
type TAuthStore = {
  currentUser: TUser | null;
  setCurrentUser: (user: TUser | null) => void;
  removeUser: () => void;
};

const getUserCookie = (): TUser | null => {
  const userCookies = getCookie(COOKIES_KEYS.CurrentUser);
  if (userCookies) {
    return JSON.parse(userCookies) as TUser;
  }
  return null;
};
export const useAuthStore = create(
  immer<TAuthStore>((set) => ({
    currentUser: getUserCookie(),
    setCurrentUser: (user) =>
      set((state) => {
        state.currentUser = user;
      }),
    removeUser: () =>
      set((state) => {
        deleteCookie(COOKIES_KEYS.CurrentUser);
        state.currentUser = null;
      }),
  }))
);
