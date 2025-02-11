import { getGameListApi } from "@/apis/game";
import { TBasicGame, TGetGameParams } from "@/models/game";
import { TServerError } from "@/models/ServerErrorRespond";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

type Props = {
  filter?: TGetGameParams;
  onErrorGetGame?: (err: TServerError) => void;
};

// ✅ Ensure query key is properly typed
const getQueryKey = (filter?: TGetGameParams): string[] => {
  const baseQKey: string[] = ["game-list"];
  if (filter?.createdByUserId) {
    baseQKey.push(`user:${filter.createdByUserId}`);
  }
  if (filter?.gameName) {
    baseQKey.push(`game:${filter.gameName}`);
  }
  return baseQKey;
};

const useGetGame = ({ filter, onErrorGetGame }: Props = {}): UseQueryResult<
  TBasicGame[],
  TServerError
> => {
  return useQuery<TBasicGame[], TServerError>({
    queryKey: getQueryKey(filter),
    queryFn: async () => {
      try {
        return await getGameListApi(filter);
      } catch (error) {
        onErrorGetGame?.(error as TServerError);
        throw error;
      }
    },
    gcTime: 1000 * 60 * 15, // Cache for 15 minutes
    staleTime: 5 * 1000 * 60, // Stale after 5 minutes
  });
};

export default useGetGame;
