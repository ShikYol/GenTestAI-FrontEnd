// src/context/AnalysisContext.tsx
import { createContext, useContext, useState } from "react";
import { fetchAnalysis } from "../api/client";

type AnalysisContextType = {
  analysis: any;
  loading: boolean;
  error: string | null;
  runAnalysis: (payload?: any) => Promise<void>;
};

const AnalysisContext = createContext<AnalysisContextType | null>(null);

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runAnalysis(payload: any = {}) {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAnalysis(payload);
      setAnalysis(data); // ✅ store the full backend blob
    } catch (err: any) {
      setError(err.message ?? "Failed to fetch analysis");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnalysisContext.Provider value={{ analysis, loading, error, runAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const ctx = useContext(AnalysisContext);
  if (!ctx) throw new Error("useAnalysis must be used inside AnalysisProvider");
  return ctx;
}
