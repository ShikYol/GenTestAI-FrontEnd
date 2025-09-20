import httpClient from "./httpClient";

export async function analyzeChange(payload: { diff: string; files?: string[]; commitId?: string; repo?: string }): Promise<any> {
  return httpClient.post("/ai/request", {
    service: "analysis",
    action: "analyzeChange",
    payload,
  });
}

export async function getRecommendations(changeId: string): Promise<any> {
  return httpClient.post("/ai/request", {
    service: "analysis",
    action: "getRecommendations",
    payload: { changeId },
  });
}

export async function listAnalyses(params?: { page?: number; pageSize?: number }): Promise<any> {
  return httpClient.post("/ai/request", {
    service: "analysis",
    action: "listAnalyses",
    payload: params,
  });
}
