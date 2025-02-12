import { addGameApi } from "@/apis/game";
import { TAddGamePayload, TGame } from "@/models/game";
import { TServerError } from "@/models/ServerErrorRespond";
import { useMutation } from "@tanstack/react-query";

type Props = {
  onSuccessAddGame?: (game: TGame) => void;
  onErrorAddGame?: (error: TServerError) => void;
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

  return {
    createGame,
  };
};

export default useMutateGame;
