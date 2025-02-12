"use client";
import GameTable from "@/components/GameTable/GameTable";
import SearchGame from "@/components/SearchGame/SearchGame";
import TooltipButton from "@/components/TooltipButton";
import AppRoutes from "@/RoutePaths";
import Link from "next/link";
import React, { useEffect } from "react";
import { IoIosAddCircle } from "react-icons/io";

type Props = {};

const GameList = (props: Props) => {
  return (
    <div className="flex w-full h-full flex-col px-[20px] ">
      <div className="flex w-full justify-between items-center">
        <h3 className="text-lg md:text-2xl font-bold font-concert">
          All games
        </h3>

        <SearchGame />
        <Link href={AppRoutes.CreateGame} className="ml-2 flex items-center">
          <TooltipButton
            triggerComponent={<IoIosAddCircle className="text-2xl" />}
            content="Create new game"
          />
        </Link>
      </div>

      <div className="flex-1 flex flex-col mt-4 overflow-hidden">
        <GameTable />
      </div>
    </div>
  );
};

export default GameList;
