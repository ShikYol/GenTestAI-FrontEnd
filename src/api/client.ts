// src/api/client.ts
import httpClient from "./httpClient";

export async function fetchAnalysis(payload: any) {
  // Backend AI engine may return all fields in one blob
  return await httpClient.post("api/changes", payload);
}
