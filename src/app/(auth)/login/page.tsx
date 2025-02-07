import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import QuizAppRoutes from "@/RoutePaths";
import LoginForm from "./_components/LoginForm";

const Login = () => {
  return (
    <>
      <CardHeader className="items-center justify-center">
        <CardTitle className="md:text-[30px]">Login</CardTitle>
        <CardDescription className="md:text-[14px]">
          {"Don't have an account? "}
          <Link
            href={QuizAppRoutes.Register}
            className="text-sky-600 hover:text-sky-300 transition-all duration-200 ease-linear"
          >
            Register
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </>
  );
};

export default Login;
