import httpClient from "./httpClient";
import { setToken, removeToken } from "../utils/token";

export async function login(payload: { email: string; password: string }): Promise<any> {
  const res = await httpClient.post("/ai/request", {
    service: "auth",
    action: "login",
    payload,
  });
  if (res?.token) setToken(res.token);
  return res;
}

export async function register(payload: { name: string; email: string; password: string; role?: string }): Promise<any> {
  const res = await httpClient.post("/ai/request", {
    service: "auth",
    action: "register",
    payload,
  });
  if (res?.token) setToken(res.token);
  return res;
}

export async function me(): Promise<any> {
  return httpClient.post("/ai/request", {
    service: "auth",
    action: "me",
  });
}

export async function logout(): Promise<void> {
  try {
    await httpClient.post("/ai/request", {
      service: "auth",
      action: "logout",
    });
  } finally {
    removeToken();
  }
}
