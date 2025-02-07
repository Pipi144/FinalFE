"use server";
import * as z from "zod";
import { cookies } from "next/headers";
import { COOKIES_KEYS } from "@/utils/cookies";
import { redirect } from "next/navigation";
import { findErrors } from "@/utils/serverHelperFnc";
import { TLoginState } from "@/models/AuthModels";
import AppRoutes from "@/RoutePaths";

const schema = z.object({
  userName: z.string().min(10, "Username required and at least 10 characters"),
  password: z.string().min(1, "Password required"),
});

export const handleLogin = async (
  formData: FormData
): Promise<TLoginState | undefined> => {
  const userName = formData.get("userName") ?? "";
  const password = formData.get("password") ?? "";
  const validation = schema.safeParse({
    userName,
    password,
  });
  const returnedState: TLoginState = {
    userName: userName.toString(),
    password: password.toString(),
  };
  try {
    //validate form data
    if (!validation.success) {
      returnedState.userNameErrors = await findErrors(
        "userName",
        validation.error.issues
      );
      returnedState.passwordErrors = await findErrors(
        "password",
        validation.error.issues
      );
      return returnedState;
    }

    const response = await fetch(`${process.env.APIURL}/api/User/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify JSON content type
      },
      body: JSON.stringify({ userName, password }),
    });
    const respJs = await response.json();
    if (!response.ok) {
      returnedState.serverErrors = respJs.error_description
        ? [respJs.error_description]
        : ["Failed to login"];

      return returnedState;
    }
    const cookiesStore = await cookies();
    cookiesStore.set(COOKIES_KEYS.CurrentUser, JSON.stringify(respJs), {
      httpOnly: true, // Prevents access via JavaScript
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Protects against CSRF
      path: "/",
      maxAge: 0.95 * respJs.expiresIn,
    });
  } catch (error) {
    console.log("ERROR:", error);
    returnedState.serverErrors = ["Unknown error"];
    return returnedState;
  }

  redirect(AppRoutes.Home); // redirect to quiz list when successfully login
};
