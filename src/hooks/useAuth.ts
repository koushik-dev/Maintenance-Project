import React from "react";
import { useStorage } from "./useStorage";

export const useAuth = () => {
  const { getSession, setSession, clearSession } = useStorage("user");

  return {
    isAuthenticated: !!getSession()?.uid,
    setUser: (user: any) => setSession(user),
    user: getSession(),
    removeUser: clearSession,
  };
};
