export type TBasicGameRule = {
  divisibleNumber: number;
  replacedWord: string;
};

export type TGameRule = TBasicGameRule & {
  ruleId: string;
  gameId: string;
};
