// src/api/client.ts
import httpClient from "./httpClient";

export async function fetchAnalysis() {
  // GET because your backend route is GET /api/changes
  return await httpClient.get("/changes");
}
