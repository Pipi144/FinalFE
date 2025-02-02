export type TLoginState = {
  userName?: string;
  password?: string;
  userNameErrors?: string[];
  passwordErrors?: string[];
  serverErrors?: string[];
  success?: boolean;
};
