// src/utils/token.ts
export const TOKEN_KEY = "ai_testing_companion_token";

export const getToken = (): string | null => {
  try { return localStorage.getItem(TOKEN_KEY); }
  catch { return null; }
};

export const setToken = (token: string) => {
  try { localStorage.setItem(TOKEN_KEY, token); } catch {}
};

export const removeToken = () => {
  try { localStorage.removeItem(TOKEN_KEY); } catch {}
};
