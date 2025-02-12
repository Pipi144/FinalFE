"use client";
import TextFieldWithLabel from "@/components/TextFieldWithLabel/TextFieldWithLabel";
import { TAddGamePayload } from "@/models/game";
import { useAuthStore } from "@/stores/authStore";
import { produce } from "immer";
import React, { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import * as z from "zod";
import AddGameRule from "@/components/AddGameRule/AddGameRule";
import { useGameContext } from "@/Providers/GameProvider";
type Props = {};
const schema = z.object({
  gameName: z.string().min(5, "Game name required and at least 5 characters"),
});
const AddGame = (props: Props) => {
  const { addGamePayload, setAddGamePayload } = useGameContext();

  const handlePayloadChange = (
    key: keyof Omit<TAddGamePayload, "gameRules">,
    value: string
  ) => {
    setAddGamePayload(
      produce((draft) => {
        if (key === "numberRange" || key === "timeLimit")
          draft[key] = Number(value);
        else draft[key] = value.toString();
      })
    );
  };
  return (
    <div className="flex w-full h-full flex-col px-[20px] items-center">
      <h3 className="text-lg md:text-2xl font-bold font-concert">
        Create game
      </h3>

      <div className="flex items-center justify-between flex-wrap w-full mt-4">
        <TextFieldWithLabel
          labelText="Game name *"
          value={addGamePayload.gameName}
          onChange={(e) => handlePayloadChange("gameName", e.target.value)}
          placeholder="Enter game name"
        />

        <TextFieldWithLabel
          labelText="Time limit (minute)"
          value={addGamePayload.timeLimit}
          onChange={(e) => handlePayloadChange("timeLimit", e.target.value)}
          placeholder="Enter time limit"
          type="number"
        />
      </div>

      <div className="flex items-center justify-between flex-wrap w-full mt-4">
        <TextFieldWithLabel
          labelText="Range"
          value={addGamePayload.numberRange}
          onChange={(e) => handlePayloadChange("numberRange", e.target.value)}
          placeholder="Enter max range"
          type="number"
        />
      </div>

      <AddGameRule />
    </div>
  );
};

export default AddGame;
