import { loginApi, registerApi } from "@/apis/auth";
import { useMutation } from "@tanstack/react-query";

const useAuth = () => {
  const login = useMutation({
    mutationKey: ["login"],
    mutationFn: loginApi,
  });

  const register = useMutation({
    mutationKey: ["register"],
    mutationFn: registerApi,
  });

  return {
    login,
    register,
  };
};

export default useAuth;
