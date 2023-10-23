import { useCookies } from "react-cookie";
export const useAuth = () => {
  const [cookies] = useCookies();
  const isAuthenticated = Boolean(cookies?.tokens?.access);

  return isAuthenticated;
};
