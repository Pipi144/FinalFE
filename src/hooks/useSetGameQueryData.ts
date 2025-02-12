import { TBasicGame } from "@/models/game";
import useGenerateQKey from "./useGenerateQKey";
import { useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";

type Props = {
  addPos?: "start" | "end";
};

const useSetGameQueryData = ({ addPos }: Props = { addPos: "start" }) => {
  const { getGameListQueryKey } = useGenerateQKey();
  const queryClient = useQueryClient();
  const addGameQueryData = (game: TBasicGame) => {
    const qKey = getGameListQueryKey({});
    const docketListQueryDataActive = queryClient.getQueryCache().findAll({
      predicate: (query) =>
        qKey.every((key) => query.queryKey.includes(key)) && query.isActive(),
    });
    const docketListQueryDataInactive = queryClient.getQueryCache().findAll({
      predicate: (query) =>
        qKey.every((key) => query.queryKey.includes(key)) && !query.isActive(),
    });

    docketListQueryDataActive.forEach((query) => {
      queryClient.setQueryData<TBasicGame[]>(query.queryKey, (old) => {
        if (old) {
          return produce(old, (draft) => {
            if (addPos === "start") draft.unshift(game);
            else draft.push(game);

            return draft;
          });
        } else return old;
      });
    });
    docketListQueryDataInactive.forEach((query) => {
      queryClient.removeQueries(query);
    });
  };

  return { addGameQueryData };
};

export default useSetGameQueryData;
