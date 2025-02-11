const AppRoutes = {
  Home: "/",
  Login: "/login",
  Register: "/register",

  // authorized paths
  Game: `/game`,
};

export const Unauthorized_Routes = [
  AppRoutes.Login,
  AppRoutes.Register,
  AppRoutes.Home,
];

export default AppRoutes;
