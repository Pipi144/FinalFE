import { TBasicGameRule } from "./gameRule";
import { TUser } from "./user";

export type TBasicGame = {
  gameId: string;
  gameName: string;
  timeLimit: number;
  numberRange: number;
  createdAt: string;
  createdByUserId: string;
};

export type TGame = TBasicGame & {
  user: TUser;
  gameRules: TBasicGameRule[];
};

export type TGetGameParams = {
  createdByUserId?: string;
  gameName?: string;
};
