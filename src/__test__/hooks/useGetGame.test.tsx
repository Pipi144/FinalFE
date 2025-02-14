import { getGameListApi } from "@/apis/game";
import useGetGame from "@/hooks/useGetGame";
import { TBasicGame } from "@/models/game";
import { TServerError } from "@/models/ServerErrorRespond";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";

jest.mock("@/apis/game");
// ✅ Helper function to provide QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const mockGameList: TBasicGame[] = [
  {
    gameId: "41",
    gameName: "peter test 1",
    timeLimit: 20,
    numberRange: 20,
    createdAt: "2025-02-13T21:57:43.493568Z",
    createdByUserId: "6",
  },
  {
    gameId: "40",
    gameName: "peter test",
    timeLimit: 50,
    numberRange: 20,
    createdAt: "2025-02-13T11:36:55.00582Z",
    createdByUserId: "6",
  },
];
const mockError: TServerError = {
  message: "Network Error",
  statusCode: 500,
  detailed: "Failed to fetch game list",
  type: "Server Error",
};
describe("useGetGame Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  it("should fetch game list data successfully", async () => {
    (getGameListApi as jest.Mock).mockResolvedValue(mockGameList);

    const { result } = renderHook(() => useGetGame(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toEqual(mockGameList);
  });

  it("should call onErrorGetGame when failed", async () => {
    (
      getGameListApi as jest.MockedFunction<typeof getGameListApi>
    ).mockRejectedValueOnce(mockError);

    const onErrorGetGame = jest.fn();
    const { result } = renderHook(() => useGetGame({ onErrorGetGame }), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toEqual(mockError);
    });

    expect(onErrorGetGame).toHaveBeenCalledWith(mockError);
  });

  it("should cache game list results", async () => {
    (getGameListApi as jest.Mock).mockResolvedValue(mockGameList);

    const { result, rerender } = renderHook(() => useGetGame({}), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Re-render without triggering another API call
    rerender();
    expect(getGameListApi).toHaveBeenCalledTimes(1);
  });
});
