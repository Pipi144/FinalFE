import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import { loginApi, registerApi } from "@/apis/auth";
import { TUser } from "@/models/user";
import { TServerError } from "@/models/ServerErrorRespond";

// ✅ Mock API calls correctly
jest.mock("@/apis/auth");

// ✅ Helper function to provide QueryClient
const queryClient = new QueryClient();
const createWrapper = () => {
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useAuth Hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  it("should call onSuccessLogin when login succeeds", async () => {
    const mockUser: TUser = { userId: "123", username: "John Doe" };
    (loginApi as jest.Mock).mockResolvedValue(mockUser);

    const onSuccessLogin = jest.fn();
    const { result } = renderHook(
      () => useAuth({ loginProps: { onSuccessLogin } }),
      {
        wrapper: createWrapper(),
      }
    );

    act(() => {
      result.current.login.mutate({ username: "pipimary", password: "1234" });
    });

    await waitFor(() => expect(result.current.login.isSuccess).toBe(true));

    expect(onSuccessLogin).toHaveBeenCalledWith(mockUser);
  });

  it("should call onErrorLogin when login fails", async () => {
    const mockError: TServerError = {
      message: "Invalid credentials",
      statusCode: 401,
      detailed: "Invalid username or password",
      type: "Unauthorized",
    };
    (loginApi as jest.MockedFunction<typeof loginApi>).mockRejectedValue(
      mockError
    );

    const onErrorLogin = jest.fn();
    const { result } = renderHook(
      () => useAuth({ loginProps: { onErrorLogin } }),
      {
        wrapper: createWrapper(),
      }
    );

    act(() => {
      result.current.login.mutate({
        username: "wrongUsername",
        password: "wrong",
      });
    });

    await waitFor(() => expect(result.current.login.isError).toBe(true));

    expect(onErrorLogin).toHaveBeenCalledWith(mockError);
  });

  it("should call onSuccessRegister when register succeeds", async () => {
    const mockUser: TUser = { userId: "11", username: "pipi" };
    (registerApi as jest.MockedFunction<typeof registerApi>).mockResolvedValue(
      mockUser
    );

    const onSuccessRegister = jest.fn();
    const { result } = renderHook(
      () => useAuth({ registerProps: { onSuccessRegister } }),
      {
        wrapper: createWrapper(),
      }
    );

    act(() => {
      result.current.register.mutate({ username: "pipi", password: "pass" });
    });

    await waitFor(() => expect(result.current.register.isSuccess).toBe(true));

    expect(onSuccessRegister).toHaveBeenCalledWith(mockUser);
  });

  it("should call onErrorRegister when register fails", async () => {
    const mockError: TServerError = {
      message: "User already exists",
      statusCode: 409,
      detailed: "User with this email already exists",
      type: "Conflict",
    };
    (registerApi as jest.MockedFunction<typeof registerApi>).mockRejectedValue(
      mockError
    );

    const onErrorRegister = jest.fn();
    const { result } = renderHook(
      () => useAuth({ registerProps: { onErrorRegister } }),
      {
        wrapper: createWrapper(),
      }
    );

    act(() => {
      result.current.register.mutate({
        username: "takenUsername",
        password: "pass",
      });
    });

    await waitFor(() => expect(result.current.register.isError).toBe(true));

    expect(onErrorRegister).toHaveBeenCalledWith(mockError);
  });
});
