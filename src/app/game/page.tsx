"use client";
import SearchGame from "@/components/SearchGame/SearchGame";
import useGetGame from "@/hooks/useGetGame";
import { useAuthStore } from "@/stores/authStore";
import React, { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

type Props = {};

const GameList = (props: Props) => {
  const { currentUser } = useAuthStore(
    useShallow((state) => ({ currentUser: state.currentUser }))
  );
  const gameQuery = useGetGame({
    filter: {
      createdByUserId: currentUser?.userId,
    },
  });
  const gameData = gameQuery.data ?? [];
  useEffect(() => {
    console.log(gameData);
  }, [gameData]);

  return (
    <div className="flex w-full h-full flex-col px-[20px]">
      <div className="flex w-full justify-between items-center">
        <h3 className="text-lg md:text-2xl font-bold font-concert">
          All games
        </h3>

        <SearchGame />
      </div>
    </div>
  );
};

export default GameList;
