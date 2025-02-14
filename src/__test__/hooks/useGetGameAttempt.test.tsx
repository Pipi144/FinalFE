import { getGameAttemptApi } from "@/apis/gameAttempt";
import useGetGameAttempt from "@/hooks/useGetGameAttempt";
import { TGameAttempt } from "@/models/gameAttempt";
import { TServerError } from "@/models/ServerErrorRespond";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";

jest.mock("@/apis/gameAttempt");
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

const mockGameAttempt: TGameAttempt = {
  attemptId: "42",
  score: 0,
  gameId: "41",
  attemptedDate: "2025-02-14T09:53:31.346506Z",
  attemptByUserId: "6",
  attemptByUser: {
    userId: "6",
    username: "testuser",
  },
  gameQuestions: [],
};
const mockError: TServerError = {
  message: "Network Error",
  statusCode: 500,
  detailed: "Failed to fetch game attempt",
  type: "Server Error",
};
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useGetGameAttempt hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  it("should return game attempt when successful", async () => {
    (getGameAttemptApi as jest.Mock).mockResolvedValue(mockGameAttempt);

    const gameAttemptId = "42";

    const { result } = renderHook(
      () => useGetGameAttempt({ attemptId: gameAttemptId }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
    expect(result.current.data).toEqual(mockGameAttempt);
  });

  it("should call onErrorGetGameAttempt when failed", async () => {
    (getGameAttemptApi as jest.Mock).mockRejectedValue(mockError);

    const gameAttemptId = "42";
    const onErrorGetGameAttempt = jest.fn();

    const { result } = renderHook(
      () =>
        useGetGameAttempt({
          attemptId: gameAttemptId,
          onErrorGetGameAttempt,
        }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
    expect(result.current.error).toEqual(mockError);
    expect(onErrorGetGameAttempt).toHaveBeenCalledWith(mockError);
  });

  it("should cache game attempt detail results", async () => {
    (getGameAttemptApi as jest.Mock).mockResolvedValue(mockGameAttempt);

    const gameAttemptId = "42";
    const { result, rerender } = renderHook(
      () =>
        useGetGameAttempt({
          attemptId: gameAttemptId,
        }),
      { wrapper }
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Re-render without triggering another API call
    rerender();
    expect(getGameAttemptApi).toHaveBeenCalledTimes(1);
  });
});
