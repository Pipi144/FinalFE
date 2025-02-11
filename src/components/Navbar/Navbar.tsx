"use client";
import QuizAppRoutes from "@/RoutePaths";

import Link from "next/link";
import React, { Suspense } from "react";

import AnimatedButton from "../AnimatedComponents/animated-button";
import Image from "next/image";

import LogoutBtn from "./LogoutBtn";
import CustomTextLogo from "../CustomTextLogo";
import { useAuthStore } from "@/stores/authStore";
import { useShallow } from "zustand/react/shallow";

const Navbar = () => {
  const { currentUser } = useAuthStore(
    useShallow((state) => ({ currentUser: state.currentUser }))
  );

  return (
    <div className="w-full fixed top-0 max-w-[1280px] p-[20px] self-center flex flex-row items-center">
      <Link
        href={QuizAppRoutes.Home}
        className="cursor-pointer flex flex-row items-center"
        as="image"
      >
        <Image
          width={30}
          height={30}
          src={"/favicon.ico"}
          alt="Favicon"
          className="md:w-[40px] md:h-[50px] object-contain"
          priority={true}
        />
      </Link>

      {currentUser ? (
        <>
          <AnimatedButton className="ml-auto">
            <CustomTextLogo name={currentUser.username} />
          </AnimatedButton>
          <LogoutBtn />
        </>
      ) : (
        <>
          <Link
            href={QuizAppRoutes.Login}
            className="px-[20px] py-[5px] rounded-sm ml-auto bg-white hover:bg-white hover:bg-opacity-80 text-black mr-[10px]"
          >
            Login
          </Link>
          <Link
            href={QuizAppRoutes.Register}
            className="px-[20px] py-[5px] border-[1px] border-solid border-btnDarkBorderColor
         rounded-sm bg-btnDarkBgColor hover:bg-btnDarkHoverBgColor text-white 
         transition-all duration-200 ease-linear cursor-pointer"
          >
            Sign up
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
