import React, { PropsWithChildren, useMemo, useState } from "react";

type Props = PropsWithChildren;

type TGameContextValue = {
  searchGameValue: string;
  setSearchGameValue: React.Dispatch<React.SetStateAction<string>>;
};
const GameContext = React.createContext<TGameContextValue | null>(null);
const GameProvider = ({ children }: Props) => {
  const [searchGameValue, setSearchGameValue] = useState("");

  const contextVal: TGameContextValue = useMemo(
    () => ({ searchGameValue, setSearchGameValue }),
    [searchGameValue]
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
