import { TBasicGame } from "@/models/game";
import useGenerateQKey from "./useGenerateQKey";
import { useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";

type Props = {
  addPos?: "start" | "end";
};

const useSetGameQueryData = ({ addPos }: Props = { addPos: "start" }) => {
  const { getGameListQueryKey, getGameDetailQueryKey } = useGenerateQKey();
  const queryClient = useQueryClient();
  const addGameQueryData = (game: TBasicGame) => {
    const qKey = getGameListQueryKey({});
    const gameListQueryDataActive = queryClient.getQueryCache().findAll({
      predicate: (query) =>
        qKey.every((key) => query.queryKey.includes(key)) && query.isActive(),
    });
    const gameListQueryDataInactive = queryClient.getQueryCache().findAll({
      predicate: (query) =>
        qKey.every((key) => query.queryKey.includes(key)) && !query.isActive(),
    });

    gameListQueryDataActive.forEach((query) => {
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
    gameListQueryDataInactive.forEach((query) => {
      queryClient.removeQueries(query);
    });
  };

  const editGameQueryData = (game: TBasicGame) => {
    const qKey = getGameListQueryKey({});
    const gameListQueryDataActive = queryClient.getQueryCache().findAll({
      predicate: (query) =>
        qKey.every((key) => query.queryKey.includes(key)) && query.isActive(),
    });
    const gameListQueryDataInactive = queryClient.getQueryCache().findAll({
      predicate: (query) =>
        qKey.every((key) => query.queryKey.includes(key)) && !query.isActive(),
    });

    gameListQueryDataActive.forEach((query) => {
      queryClient.setQueryData<TBasicGame[]>(query.queryKey, (old) => {
        if (old) {
          return produce(old, (draft) => {
            const foundGame = draft.find((g) => g.gameId === game.gameId);
            if (foundGame) Object.assign(foundGame, game);

            return draft;
          });
        } else return old;
      });
    });
    gameListQueryDataInactive.forEach((query) => {
      queryClient.removeQueries(query);
    });
  };
  return { addGameQueryData, editGameQueryData };
};

export default useSetGameQueryData;
