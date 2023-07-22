export const useStorage = (key: string) => {
  const setSession = (user: any) =>
    localStorage.setItem(key, JSON.stringify(user));
  const getSession = () => JSON.parse(localStorage.getItem(key)!);
  const clearSession = () => localStorage.removeItem(key);

  return { setSession, getSession, clearSession };
};
