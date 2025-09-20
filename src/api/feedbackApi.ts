import httpClient from "./httpClient";

export async function submitFeedback(payload: { targetId: string; targetType: string; useful: boolean }): Promise<any> {
  return httpClient.post("/ai/request", {
    service: "feedback",
    action: "submit",
    payload,
  });
}

export async function getHistory(params?: { page?: number; pageSize?: number }): Promise<any> {
  return httpClient.post("/ai/request", {
    service: "feedback",
    action: "history",
    payload: params,
  });
}
