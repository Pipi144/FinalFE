import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useMutateGame from "@/hooks/useMutateGame";
import { addGameApi, editGameApi, deleteGameApi } from "@/apis/game";
import { TAddGamePayload, TGame, TUpdateGamePayload } from "@/models/game";
import { TServerError } from "@/models/ServerErrorRespond";

jest.mock("@/apis/game");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

// Mock Data
const mockGame: TGame = {
  user: {
    userId: "6",
    username: "pipimary",
  },
  gameRules: [
    {
      ruleId: "85",
      gameId: "41",
      divisibleNumber: 3,
      replacedWord: "hello",
    },
    {
      ruleId: "84",
      gameId: "41",
      divisibleNumber: 5,
      replacedWord: "pipi",
    },
  ],
  gameId: "41",
  gameName: "peter test 1",
  timeLimit: 20,
  numberRange: 20,
  createdAt: "2025-02-13T21:57:43.493568Z",
  createdByUserId: "6",
};
const mockError: TServerError = {
  message: "Failed",
  statusCode: 500,
  detailed: "Internal Server Error",
  type: "Server Error",
};
const mockAddPayload: TAddGamePayload = {
  gameName: "peter test 1",
  timeLimit: 20,
  numberRange: 20,
  createdByUserId: "6",
  gameRules: [],
};

const mockEditPayload: TUpdateGamePayload = {
  gameId: "41",
  gameName: "pipi",
  timeLimit: 20,
  numberRange: 40,
};

describe("useMutateGame Hook", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    queryClient.clear();
  });

  it("should call onSuccessAddGame when createGame succeeds", async () => {
    (
      addGameApi as jest.MockedFunction<typeof addGameApi>
    ).mockResolvedValueOnce(mockGame);

    const onSuccessAddGame = jest.fn();
    const { result } = renderHook(() => useMutateGame({ onSuccessAddGame }), {
      wrapper,
    });

    act(() => {
      result.current.createGame.mutate(mockAddPayload);
    });

    await waitFor(() => expect(result.current.createGame.isSuccess).toBe(true));
    expect(result.current.createGame.data).toEqual(mockGame);
    expect(onSuccessAddGame).toHaveBeenCalledWith(mockGame);
  });

  it("should call onErrorAddGame when createGame fails", async () => {
    (addGameApi as jest.Mock).mockRejectedValueOnce(mockError);

    const onErrorAddGame = jest.fn();
    const { result } = renderHook(() => useMutateGame({ onErrorAddGame }), {
      wrapper,
    });

    act(() => {
      result.current.createGame.mutate(mockAddPayload);
    });

    await waitFor(() => expect(result.current.createGame.isError).toBe(true));
    expect(result.current.createGame.error).toEqual(mockError);
    expect(onErrorAddGame).toHaveBeenCalledWith(mockError);
  });

  it("should call onSuccessEditGame when editGame succeeds", async () => {
    (editGameApi as jest.Mock).mockResolvedValueOnce(mockGame);

    const onSuccessEditGame = jest.fn();
    const { result } = renderHook(() => useMutateGame({ onSuccessEditGame }), {
      wrapper,
    });

    act(() => {
      result.current.editGame.mutate(mockEditPayload);
    });

    await waitFor(() => expect(result.current.editGame.isSuccess).toBe(true));
    expect(result.current.editGame.data).toEqual(mockGame);
    expect(onSuccessEditGame).toHaveBeenCalledWith(mockGame);
  });

  it("should call onErrorEditGame when editGame fails", async () => {
    (editGameApi as jest.Mock).mockRejectedValueOnce(mockError);

    const onErrorEditGame = jest.fn();
    const { result } = renderHook(() => useMutateGame({ onErrorEditGame }), {
      wrapper,
    });

    act(() => {
      result.current.editGame.mutate(mockEditPayload);
    });

    await waitFor(() => expect(result.current.editGame.isError).toBe(true));
    expect(result.current.editGame.error).toEqual(mockError);
    expect(onErrorEditGame).toHaveBeenCalledWith(mockError);
  });

  it("should call onSuccessDeleteGame when deleteGame succeeds", async () => {
    (deleteGameApi as jest.Mock).mockResolvedValueOnce(undefined);

    const onSuccessDeleteGame = jest.fn();
    const deletedGameId = "123";
    const { result } = renderHook(
      () => useMutateGame({ onSuccessDeleteGame }),
      { wrapper }
    );

    act(() => {
      result.current.deleteGame.mutate(deletedGameId);
    });

    await waitFor(() => expect(result.current.deleteGame.isSuccess).toBe(true));

    expect(onSuccessDeleteGame).toHaveBeenCalledWith("123");
  });

  it("should call onErrorDeleteGame when deleteGame fails", async () => {
    (deleteGameApi as jest.Mock).mockRejectedValueOnce(mockError);

    const onErrorDeleteGame = jest.fn();
    const deletedGameId = "123";
    const { result } = renderHook(() => useMutateGame({ onErrorDeleteGame }), {
      wrapper,
    });

    act(() => {
      result.current.deleteGame.mutate(deletedGameId);
    });

    await waitFor(() => expect(result.current.deleteGame.isError).toBe(true));
    expect(result.current.deleteGame.error).toEqual(mockError);
    expect(onErrorDeleteGame).toHaveBeenCalledWith(mockError);
  });
});
