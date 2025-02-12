import { TGetGameParams } from "@/models/game";

const useGenerateQKey = () => {
  const getGameListQueryKey = (filter?: TGetGameParams): string[] => {
    const baseQKey: string[] = ["game-list"];
    if (filter?.createdByUserId) {
      baseQKey.push(`user:${filter.createdByUserId}`);
    }
    if (filter?.gameName) {
      baseQKey.push(`game:${filter.gameName}`);
    }
    return baseQKey;
  };

  return {
    getGameListQueryKey,
  };
};

export default useGenerateQKey;
