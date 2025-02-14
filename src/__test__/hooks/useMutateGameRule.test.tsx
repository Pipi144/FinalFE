import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useMutateGameRule from "@/hooks/useMutateGameRule";
import {
  addGameRuleApi,
  editGameRuleApi,
  deleteGameRuleApi,
} from "@/apis/gameRule";
import {
  TGameRule,
  TAddGameRulePayload,
  TUpdateGameRulePayload,
} from "@/models/gameRule";
import { TServerError } from "@/models/ServerErrorRespond";

//  Mock API calls
jest.mock("@/apis/gameRule");

//  Helper function to provide QueryClient
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

//  Mock Data
const mockGameRule: TGameRule = {
  ruleId: "85",
  gameId: "41",
  divisibleNumber: 3,
  replacedWord: "hello",
};

const mockError: TServerError = {
  message: "Failed",
  statusCode: 500,
  detailed: "Internal Server Error",
  type: "Server Error",
};
const mockAddPayload: TAddGameRulePayload = {
  gameId: "1",
  divisibleNumber: 3,
  replacedWord: "hello",
};
const mockUpdatePayload: TUpdateGameRulePayload = {
  ruleId: "85",
  divisibleNumber: 3,
  replacedWord: "hello",
};
describe("useMutateGameRule Hook", () => {
  beforeEach(() => {
    jest.resetAllMocks(); //  Reset mocks before each test
    queryClient.clear(); //  Clear cache before each test
  });

  it("should call onSuccessAddGameRule when createGameRule succeeds", async () => {
    (addGameRuleApi as jest.Mock).mockResolvedValueOnce(mockGameRule);

    const onSuccessAddGameRule = jest.fn();
    const { result } = renderHook(
      () => useMutateGameRule({ onSuccessAddGameRule }),
      { wrapper }
    );

    act(() => {
      result.current.createGameRule.mutate(mockAddPayload);
    });

    await waitFor(() =>
      expect(result.current.createGameRule.isSuccess).toBe(true)
    );
    expect(result.current.createGameRule.data).toEqual(mockGameRule);
    expect(onSuccessAddGameRule).toHaveBeenCalledWith(mockGameRule);
  });

  it("should call onErrorAddGameRule when createGameRule fails", async () => {
    (addGameRuleApi as jest.Mock).mockRejectedValueOnce(mockError);

    const onErrorAddGameRule = jest.fn();
    const { result } = renderHook(
      () => useMutateGameRule({ onErrorAddGameRule }),
      { wrapper }
    );

    act(() => {
      result.current.createGameRule.mutate(mockAddPayload);
    });

    await waitFor(() =>
      expect(result.current.createGameRule.isError).toBe(true)
    );
    expect(result.current.createGameRule.error).toEqual(mockError);
    expect(onErrorAddGameRule).toHaveBeenCalledWith(mockError);
  });

  it("should call onSuccessEditGameRule when editGameRule succeeds", async () => {
    (editGameRuleApi as jest.Mock).mockResolvedValueOnce(mockGameRule);

    const onSuccessEditGameRule = jest.fn();
    const { result } = renderHook(
      () => useMutateGameRule({ onSuccessEditGameRule }),
      { wrapper }
    );

    act(() => {
      result.current.editGameRule.mutate(mockUpdatePayload);
    });

    await waitFor(() =>
      expect(result.current.editGameRule.isSuccess).toBe(true)
    );
    expect(result.current.editGameRule.data).toEqual(mockGameRule);
    expect(onSuccessEditGameRule).toHaveBeenCalledWith(mockGameRule);
  });

  it("should call onErrorEditGameRule when editGameRule fails", async () => {
    (
      editGameRuleApi as jest.MockedFunction<typeof editGameRuleApi>
    ).mockRejectedValueOnce(mockError);

    const onErrorEditGameRule = jest.fn();
    const { result } = renderHook(
      () => useMutateGameRule({ onErrorEditGameRule }),
      { wrapper }
    );

    act(() => {
      result.current.editGameRule.mutate(mockUpdatePayload);
    });

    await waitFor(() => expect(result.current.editGameRule.isError).toBe(true));

    expect(result.current.editGameRule.error).toEqual(mockError);
    expect(onErrorEditGameRule).toHaveBeenCalledWith(mockError);
  });

  it("should call onSuccessDeleteGameRule when deleteGameRule succeeds", async () => {
    (
      deleteGameRuleApi as jest.MockedFunction<typeof deleteGameRuleApi>
    ).mockResolvedValueOnce(undefined);

    const onSuccessDeleteGameRule = jest.fn();
    const deletedRuleId = "123";
    const { result } = renderHook(
      () => useMutateGameRule({ onSuccessDeleteGameRule }),
      { wrapper }
    );

    act(() => {
      result.current.deleteGameRule.mutate(deletedRuleId);
    });

    await waitFor(() =>
      expect(result.current.deleteGameRule.isSuccess).toBe(true)
    );

    expect(onSuccessDeleteGameRule).toHaveBeenCalledWith(deletedRuleId);
  });

  it("should call onErrorDeleteGameRule when deleteGameRule fails", async () => {
    (deleteGameRuleApi as jest.Mock).mockRejectedValueOnce(mockError);

    const onErrorDeleteGameRule = jest.fn();
    const deletedRuleId = "123";
    const { result } = renderHook(
      () => useMutateGameRule({ onErrorDeleteGameRule }),
      { wrapper }
    );

    act(() => {
      result.current.deleteGameRule.mutate(deletedRuleId);
    });

    await waitFor(() =>
      expect(result.current.deleteGameRule.isError).toBe(true)
    );

    expect(result.current.deleteGameRule.error).toEqual(mockError);
    expect(onErrorDeleteGameRule).toHaveBeenCalledWith(mockError);
  });
});
