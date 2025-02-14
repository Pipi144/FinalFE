import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useMutateGameAttempt from "@/hooks/useMutateGameAttempt";
import {
  createGameAttemptApi,
  generateGameQuestionApi,
  checkAnswerApi,
} from "@/apis/gameAttempt";
import {
  TGameAttempt,
  TAddGameAttemptPayload,
  TCheckAnswerPayload,
} from "@/models/gameAttempt";
import { TServerError } from "@/models/ServerErrorRespond";
import { TGameQuestion } from "@/models/gameQuestion";

// Mock API calls
jest.mock("@/apis/gameAttempt");

// Helper function to provide QueryClient
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

// Mock Data
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
const mockGameQuestion: TGameQuestion = {
  id: "1",
  gameAttemptId: "42",
  questionNumber: 13,
  userAnswer: "4",
  isCorrectAnswer: false,
};
const mockError: TServerError = {
  message: "Failed",
  statusCode: 500,
  detailed: "Internal Server Error",
  type: "Server Error",
};
const mockAddPayload: TAddGameAttemptPayload = {
  gameId: "1",
  attemptByUserId: "1",
};
const mockCheckAnswerPayload: TCheckAnswerPayload = {
  questionId: "1",
  answer: "1",
};
describe("useMutateGameAttempt Hook", () => {
  beforeEach(() => {
    jest.resetAllMocks(); // Reset mocks before each test
    queryClient.clear(); // Clear queryClient before each test
  });

  it("should call onSuccessCreateGameAttempt when createGameAttempt succeeds", async () => {
    (createGameAttemptApi as jest.Mock).mockResolvedValueOnce(mockGameAttempt);

    const onSuccessCreateGameAttempt = jest.fn();
    const { result } = renderHook(
      () => useMutateGameAttempt({ onSuccessCreateGameAttempt }),
      { wrapper }
    );

    act(() => {
      result.current.createGameAttempt.mutate(mockAddPayload);
    });

    await waitFor(() =>
      expect(result.current.createGameAttempt.isSuccess).toBe(true)
    );
    expect(result.current.createGameAttempt.data).toEqual(mockGameAttempt);
    expect(onSuccessCreateGameAttempt).toHaveBeenCalledWith(mockGameAttempt);
  });

  it("should call onErrorCreateGameAttempt when createGameAttempt fails", async () => {
    (createGameAttemptApi as jest.Mock).mockRejectedValueOnce(mockError);

    const onErrorCreateGameAttempt = jest.fn();
    const { result } = renderHook(
      () => useMutateGameAttempt({ onErrorCreateGameAttempt }),
      { wrapper }
    );

    act(() => {
      result.current.createGameAttempt.mutate(mockAddPayload);
    });

    await waitFor(() =>
      expect(result.current.createGameAttempt.isError).toBe(true)
    );
    expect(result.current.createGameAttempt.error).toEqual(mockError);
    expect(onErrorCreateGameAttempt).toHaveBeenCalledWith(mockError);
  });

  it("should call onSuccessGenerateQuestion when generateQuestion succeeds", async () => {
    (generateGameQuestionApi as jest.Mock).mockResolvedValueOnce(
      mockGameQuestion
    );

    const onSuccessGenerateQuestion = jest.fn();
    const { result } = renderHook(
      () => useMutateGameAttempt({ onSuccessGenerateQuestion }),
      { wrapper }
    );

    const attemptId = "123";
    act(() => {
      result.current.generateQuestion.mutate(attemptId);
    });

    await waitFor(() =>
      expect(result.current.generateQuestion.isSuccess).toBe(true)
    );
    expect(result.current.generateQuestion.data).toEqual(mockGameQuestion);
    expect(onSuccessGenerateQuestion).toHaveBeenCalledWith(mockGameQuestion);
  });

  it("should call onErrorGenerateQuestion when generateQuestion fails", async () => {
    (generateGameQuestionApi as jest.Mock).mockRejectedValueOnce(mockError);

    const onErrorGenerateQuestion = jest.fn();
    const { result } = renderHook(
      () => useMutateGameAttempt({ onErrorGenerateQuestion }),
      { wrapper }
    );

    const attemptId = "123";
    act(() => {
      result.current.generateQuestion.mutate(attemptId);
    });

    await waitFor(() =>
      expect(result.current.generateQuestion.isError).toBe(true)
    );
    expect(result.current.generateQuestion.error).toEqual(mockError);
    expect(onErrorGenerateQuestion).toHaveBeenCalledWith(mockError);
  });

  it("should call onSuccessCheckAnswer when checkQuestion succeeds", async () => {
    (checkAnswerApi as jest.Mock).mockResolvedValueOnce(mockGameQuestion);

    const onSuccessCheckAnswer = jest.fn();
    const { result } = renderHook(
      () => useMutateGameAttempt({ onSuccessCheckAnswer }),
      { wrapper }
    );

    act(() => {
      result.current.checkQuestion.mutate(mockCheckAnswerPayload);
    });

    await waitFor(() =>
      expect(result.current.checkQuestion.isSuccess).toBe(true)
    );
    expect(result.current.checkQuestion.data).toEqual(mockGameQuestion);
    expect(onSuccessCheckAnswer).toHaveBeenCalledWith(mockGameQuestion);
  });

  it("should call onErrorCheckAnswer when checkQuestion fails", async () => {
    (checkAnswerApi as jest.Mock).mockRejectedValueOnce(mockError);

    const onErrorCheckAnswer = jest.fn();
    const { result } = renderHook(
      () => useMutateGameAttempt({ onErrorCheckAnswer }),
      { wrapper }
    );

    act(() => {
      result.current.checkQuestion.mutate(mockCheckAnswerPayload);
    });

    await waitFor(() =>
      expect(result.current.checkQuestion.isError).toBe(true)
    );
    expect(result.current.checkQuestion.error).toEqual(mockError);
    expect(onErrorCheckAnswer).toHaveBeenCalledWith(mockError);
  });
});
