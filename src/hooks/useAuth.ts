import { loginApi, registerApi } from "@/apis/auth";
import { TServerError } from "@/models/ServerErrorRespond";
import { TUser } from "@/models/user";
import { useMutation } from "@tanstack/react-query";

type TAuthProps = {
  loginProps?: {
    onSuccessLogin?: (user: TUser) => void;
    onErrorLogin?: (error: Error) => void;
  };
  registerProps?: {
    onSuccessRegister?: (user: TUser) => void;
    onErrorRegister?: (error: Error) => void;
  };
};
const useAuth = (authProps: TAuthProps = {}) => {
  const login = useMutation({
    mutationKey: ["login"],
    mutationFn: loginApi,
    onSuccess(res, variables, context) {
      if (authProps?.loginProps?.onSuccessLogin)
        authProps?.loginProps?.onSuccessLogin(res.data);
    },
    onError(error, variables, context) {
      if (authProps?.loginProps?.onErrorLogin)
        authProps?.loginProps?.onErrorLogin(error);
    },
  });

  const register = useMutation({
    mutationKey: ["register"],
    mutationFn: registerApi,
    onSuccess(res, variables, context) {
      if (authProps?.registerProps?.onSuccessRegister)
        authProps?.registerProps?.onSuccessRegister(res.data);
    },
    onError(error, variables, context) {
      if (authProps?.registerProps?.onErrorRegister)
        authProps?.registerProps?.onErrorRegister(error);
    },
  });

  return {
    login,
    register,
  };
};

export default useAuth;
