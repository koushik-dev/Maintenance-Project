import { useMemo, useState } from "react";
import { useStorage } from "./useStorage";

export const useAuth = () => {
  const { getSession, setSession, clearSession } = useStorage("user");
  const [user, setUser] = useState<any>(getSession);

  const logInUser = (data: any) => {
    setSession(data);
    setUser(data);
  };
  const isAuthenticated = !!user?.uid;
  const isAdmin = user?.displayName === "Admin";
  const logOutUser = clearSession;

  const value = useMemo(
    () => ({
      logInUser,
      user,
      isAuthenticated,
      isAdmin,
      logOutUser,
    }),
    [user]
  );

  return value;
};
