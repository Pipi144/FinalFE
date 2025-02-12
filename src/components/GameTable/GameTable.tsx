import useGetGame from "@/hooks/useGetGame";
import { useGameContext } from "@/Providers/GameProvider";
import { useAuthStore } from "@/stores/authStore";
import React from "react";
import { useShallow } from "zustand/react/shallow";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import GameItem from "../GameItem/GameItem";

type Props = {};

const GameTable = (props: Props) => {
  const { currentUser } = useAuthStore(
    useShallow((state) => ({ currentUser: state.currentUser }))
  );
  const { searchGameValue } = useGameContext();
  const gameQuery = useGetGame({
    filter: {
      createdByUserId: currentUser?.userId,
      gameName: searchGameValue,
    },
  });
  const gameData = gameQuery.data ?? [];

  return (
    <Table className="w-full max-h-full !scrollbar-thin !scrollbar-thumb-gray-600!scrollbar-track-transparent pb-4">
      <TableHeader className="sticky top-0 bg-white ">
        <TableRow>
          <TableHead className="font-bold">Name</TableHead>
          <TableHead />
          <TableHead className="font-bold">Created at</TableHead>
          <TableHead className="font-bold">Time limit</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {gameData.map((game) => (
          <GameItem game={game} key={game.gameId} />
        ))}
      </TableBody>
      <TableFooter>
        <TableRow className="font-bold">
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell className="text-right" colSpan={1}>
            {gameData.length} {gameData.length > 1 ? "games" : "game"}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default GameTable;
