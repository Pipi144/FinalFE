"use client";
import EditGameRule from "@/components/EditGameRule/EditGameRule";
import LoaderOverlay from "@/components/LoaderOverlay";
import TextFieldWithLabel from "@/components/TextFieldWithLabel/TextFieldWithLabel";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import useGetGameDetail from "@/hooks/useGetGameDetail";
import useMutateGame from "@/hooks/useMutateGame";
import useSetGameQueryData from "@/hooks/useSetGameQueryData";
import { findErrors } from "@/utils/helperFncs";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as z from "zod";

const schema = z.object({
  gameName: z.string().min(5, "Game name required and at least 5 characters"),
  timeLimit: z.number().int().positive("Time limit must be positive"),
  numberRange: z.number().int().positive("Number range must be positive"),
});

const EditGame = () => {
  const [errorFields, setErrorFields] = useState<{
    gameNameError?: string[];
    timeLimitError?: string[];
    numberRangeError?: string[];
  }>({});
  const { gameId } = useParams<{ gameId: string }>();
  const router = useRouter();
  const gameDetailQuery = useGetGameDetail({ gameId });
  const gameData = gameDetailQuery.data;
  const { editGameQueryData } = useSetGameQueryData();
  const { editGame } = useMutateGame({
    onSuccessEditGame(game) {
      editGameQueryData(game);
      router.back();
    },
    onErrorEditGame(error) {
      toast({
        title: "Update failed",
        description: error.message,
      });
    },
  });
  const handleEditGame = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const gameName = formData.get("gameName") as string;
    const timeLimit = parseInt(formData.get("timeLimit") as string, 10);
    const numberRange = parseInt(formData.get("numberRange") as string, 10);
    const validation = schema.safeParse({
      gameName,
      timeLimit,
      numberRange,
    });
    if (!validation.success) {
      setErrorFields({
        gameNameError: findErrors("gameName", validation.error.issues),
        timeLimitError: findErrors("timeLimit", validation.error.issues),
        numberRangeError: findErrors("numberRange", validation.error.issues),
      });

      return;
    }

    editGame.mutate({
      gameId,
      gameName,
      timeLimit,
      numberRange,
    });
  };
  if (gameDetailQuery.isFetching)
    return <LoaderOverlay isOpen={true} message="Getting game details..." />;
  if (!gameData) return <div>Game not found</div>;
  return (
    <form
      className="flex w-full h-full flex-col px-[20px] items-center max-w-2xl"
      onSubmit={handleEditGame}
    >
      <h3 className="text-lg md:text-2xl font-bold font-concert">Edit game</h3>

      <div className="flex justify-between flex-wrap w-full mt-4">
        <TextFieldWithLabel
          name="gameName"
          labelText="Game name *"
          defaultValue={gameData.gameName}
          placeholder="Enter game name"
          fieldError={errorFields.gameNameError}
        />

        <TextFieldWithLabel
          name="timeLimit"
          labelText="Time limit (minute)"
          defaultValue={gameData.timeLimit}
          placeholder="Enter time limit"
          type="number"
          fieldError={errorFields.timeLimitError}
        />
      </div>

      <div className="flex items-center justify-between flex-wrap w-full mt-4">
        <TextFieldWithLabel
          name="numberRange"
          labelText="Range"
          defaultValue={gameData.numberRange}
          placeholder="Enter max range"
          type="number"
          fieldError={errorFields.numberRangeError}
        />
      </div>

      <EditGameRule game={gameData} />

      <Button className="w-full" variant="dark" type="submit">
        Submit
      </Button>

      <LoaderOverlay
        isOpen={editGame.isPending}
        message="Updating game..."
        hideCloseButton
      />
    </form>
  );
};

export default EditGame;
