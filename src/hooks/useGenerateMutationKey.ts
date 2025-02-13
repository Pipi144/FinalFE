const useGenerateMutationKey = () => {
  const getMutateGameKey = (action: "add" | "update" | "delete") => [
    `game-${action}`,
  ];
  const getMutateGameRuleKey = (action: "add" | "update" | "delete") => [
    `gameRule-${action}`,
  ];
  return { getMutateGameKey, getMutateGameRuleKey };
};

export default useGenerateMutationKey;
