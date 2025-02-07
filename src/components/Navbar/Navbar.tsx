import QuizAppRoutes from "@/RoutePaths";

import Link from "next/link";
import React, { Suspense } from "react";

import AnimatedButton from "../AnimatedComponents/animated-button";
import Image from "next/image";
import iconImg from "../../app/favicon.ico";

import { Spinner } from "../ui/spinner";
import LogoutBtn from "./LogoutBtn";
import CustomTextLogo from "../CustomTextLogo";
import { useAuthStore } from "@/stores/authStore";
import { useShallow } from "zustand/react/shallow";

const Navbar = async () => {
  const { currentUser } = useAuthStore(
    useShallow((state) => ({ currentUser: state.currentUser }))
  );

  return (
    <div className="shadow-navMenuShadow w-full fixed top-0 max-w-[1280px] p-[20px] self-center flex flex-row items-center">
      <Link
        href={QuizAppRoutes.Home}
        className="cursor-pointer flex flex-row items-center"
      >
        <Image
          width={25}
          height={25}
          src={iconImg}
          alt="App icon"
          className="md:w-[30px] md:h-[30px] object-contain"
        />
      </Link>

      {currentUser ? (
        <>
          <AnimatedButton className="ml-auto">
            <Suspense
              fallback={<Spinner size={"small"} className="text-blue-400" />}
            >
              <CustomTextLogo name={currentUser.username} />
            </Suspense>
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
