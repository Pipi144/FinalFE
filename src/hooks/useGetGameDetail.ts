import useGenerateQKey from "./useGenerateQKey";
import { useQuery } from "@tanstack/react-query";
import { TGame } from "@/models/game";
import { TServerError } from "@/models/ServerErrorRespond";
import { getGameDetailApi } from "@/apis/game";

type Props = {
  gameId: string;
  onErrorGetGameDetail?: (error: TServerError) => void;
};

const useGetGameDetail = ({ gameId, onErrorGetGameDetail }: Props) => {
  const { getGameDetailQueryKey } = useGenerateQKey();

  return useQuery<TGame, TServerError>({
    queryKey: getGameDetailQueryKey(gameId),
    queryFn: async () => {
      try {
        return await getGameDetailApi(gameId);
      } catch (error) {
        onErrorGetGameDetail?.(error as TServerError);
        throw error;
      }
    },
    gcTime: 1000 * 60 * 5, // Cache for 5
    staleTime: 2 * 1000 * 60, // Never stale
  });
};

export default useGetGameDetail;
