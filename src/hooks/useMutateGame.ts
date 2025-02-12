import { addGameApi, editGameApi } from "@/apis/game";
import { TAddGamePayload, TGame, TUpdateGamePayload } from "@/models/game";
import { TServerError } from "@/models/ServerErrorRespond";
import { useMutation } from "@tanstack/react-query";

type Props = {
  onSuccessAddGame?: (game: TGame) => void;
  onErrorAddGame?: (error: TServerError) => void;
  onSuccessEditGame?: (game: TGame) => void;
  onErrorEditGame?: (error: TServerError) => void;
};

const getMutateGameKey = (action: "add" | "update" | "delete") => [
  `game-${action}`,
];
const useMutateGame = (props: Props = {}) => {
  const createGame = useMutation<TGame, TServerError, TAddGamePayload>({
    mutationKey: getMutateGameKey("add"),
    mutationFn: addGameApi,
    onSuccess: (data) => {
      props.onSuccessAddGame && props.onSuccessAddGame(data);
    },
    onError: (err) => {
      props.onErrorAddGame && props.onErrorAddGame(err);
    },
  });

  const editGame = useMutation<TGame, TServerError, TUpdateGamePayload>({
    mutationKey: getMutateGameKey("update"),
    mutationFn: editGameApi,
    onSuccess: (data) => {
      props.onSuccessEditGame && props.onSuccessEditGame(data);
    },
    onError: (err) => {
      props.onErrorEditGame && props.onErrorEditGame(err);
    },
  });
  return {
    createGame,
    editGame,
  };
};

export default useMutateGame;
