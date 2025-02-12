import { TAddGamePayload } from "@/models/game";
import { useAuthStore } from "@/stores/authStore";
import React, { PropsWithChildren, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";

type Props = PropsWithChildren;

type TGameContextValue = {
  searchGameValue: string;
  setSearchGameValue: React.Dispatch<React.SetStateAction<string>>;
  addGamePayload: TAddGamePayload;
  setAddGamePayload: React.Dispatch<React.SetStateAction<TAddGamePayload>>;
};
const GameContext = React.createContext<TGameContextValue | null>(null);
const GameProvider = ({ children }: Props) => {
  const { currentUser } = useAuthStore(
    useShallow((state) => ({ currentUser: state.currentUser }))
  );
  const [addGamePayload, setAddGamePayload] = useState<TAddGamePayload>({
    gameName: "",
    timeLimit: 0,
    createdByUserId: currentUser?.userId.toString() ?? "0",
    gameRules: [],
    numberRange: 10,
  });
  const [searchGameValue, setSearchGameValue] = useState("");

  const contextVal: TGameContextValue = useMemo(
    () => ({
      searchGameValue,
      setSearchGameValue,
      addGamePayload,
      setAddGamePayload,
    }),
    [searchGameValue, addGamePayload]
  );
  return (
    <GameContext.Provider value={contextVal}>{children}</GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = React.useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
export default GameProvider;
