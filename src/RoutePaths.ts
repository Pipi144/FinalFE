export const AUTHORIZED_PREFIX = "/authorized";
const AppRoutes = {
  Home: "/",
  Login: "/login",
  Register: "/register",

  // authorized paths
};

export const Unauthorized_Routes = [
  AppRoutes.Login,
  AppRoutes.Register,
  AppRoutes.Home,
];

export default AppRoutes;
