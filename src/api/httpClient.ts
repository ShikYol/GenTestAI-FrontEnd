import { getToken, removeToken } from "../utils/token";
import { mockApiRequest } from "../services/mockApi";

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) || "http://localhost:5432/api";

// Toggle mocks via .env (VITE_USE_MOCKS=true)
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS === "true";

export class ApiError extends Error {
  status: number;
  data?: any;
  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
  params?: Record<string, any>;
  auth?: boolean; // include Authorization header
  headers?: Record<string, string>;
};

/** Core request function */
async function request<T = any>(path: string, opts: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, params, auth = true, headers = {} } = opts;

  // ✅ Hackathon/demo mode: intercept /ai/request calls and use mocks
  if (USE_MOCKS && path === "/ai/request" && method === "POST") {
    return mockApiRequest(body) as Promise<T>;
  }

  const url = new URL(`${API_BASE}${path}`);

  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.append(k, String(v));
    });
  }

  const h: Record<string, string> = { Accept: "application/json", ...headers };

  let payload: BodyInit | undefined;
  if (body !== undefined && body !== null) {
    if (body instanceof FormData) {
      payload = body;
      // don’t set Content-Type for FormData
    } else {
      h["Content-Type"] = "application/json";
      payload = JSON.stringify(body);
    }
  }

  if (auth) {
    const token = getToken();
    if (token) h["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url.toString(), { method, headers: h, body: payload });

  if (res.status === 401) {
    removeToken();
    throw new ApiError(401, "Unauthorized");
  }

  if (res.status === 204) {
    return undefined as unknown as T;
  }

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const message = data?.message || res.statusText || "Request failed";
    throw new ApiError(res.status, message, data);
  }

  return data as T;
}

/** convenience helpers */
const httpClient = {
  request,
  get: <T = any>(path: string, params?: Record<string, any>, opts?: Partial<RequestOptions>) =>
    request<T>(path, { method: "GET", params, ...opts }),
  post: <T = any>(path: string, body?: any, opts?: Partial<RequestOptions>) =>
    request<T>(path, { method: "POST", body, ...opts }),
  put: <T = any>(path: string, body?: any, opts?: Partial<RequestOptions>) =>
    request<T>(path, { method: "PUT", body, ...opts }),
  patch: <T = any>(path: string, body?: any, opts?: Partial<RequestOptions>) =>
    request<T>(path, { method: "PATCH", body, ...opts }),
  del: <T = any>(path: string, bodyOrOpts?: any, opts?: Partial<RequestOptions>) =>
    request<T>(
      path,
      typeof bodyOrOpts === "object" && !Array.isArray(bodyOrOpts) && !("method" in (bodyOrOpts || {}))
        ? { method: "DELETE", ...bodyOrOpts }
        : { method: "DELETE", body: bodyOrOpts, ...opts }
    ),
};

export default httpClient;
