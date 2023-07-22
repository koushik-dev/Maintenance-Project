import { useStorage } from "./useStorage";

export const useAuth = () => {
  const { getSession, setSession, clearSession } = useStorage("user");
  const user = getSession();
  return {
    isAuthenticated: !!user?.uid,
    isAdmin: user?.displayName === "Admin",
    setUser: (user: any) => setSession(user),
    user,
    removeUser: clearSession,
  };
};
