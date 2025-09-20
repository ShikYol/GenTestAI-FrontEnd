// src/types/api.ts
export type User = {
  id: string;
  name: string;
  email: string;
  role: "tester" | "developer" | "admin" | string;
  createdAt?: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

export type AnalysisResult = {
  id: string;
  summary: string;
  impactedModules: string[];
  riskScore: "Low" | "Medium" | "High" | number;
  recommendations: string[];
  details?: any;
  createdAt: string;
};

export type Recommendation = {
  id: string;
  text: string;
  confidence?: number;
};

export type BugRecord = {
  id: string;
  bug: string;
  fixed?: string;
  createdAt?: string;
  resolved?: boolean;
  reporter?: string;
};

export type FeedbackPayload = {
  targetId: string; // id of analysis/recommendation/test
  targetType: "analysis" | "recommendation" | "test" | "general";
  useful: boolean;
  comment?: string;
};
