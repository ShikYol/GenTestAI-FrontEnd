// src/context/AnalysisContext.tsx
import { createContext, useContext, useState } from "react";
import httpClient from "../api/httpClient";

type AnalysisContextType = {
  changes: any[];
  loading: boolean;
  error: string | null;
  fetchChanges: () => Promise<void>;
};

const AnalysisContext = createContext<AnalysisContextType | null>(null);

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [changes, setChanges] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchChanges() {
    setLoading(true);
    setError(null);
    try {
      const data = await httpClient.get("/changes");
      setChanges(data.changes || []); // ✅ directly use nested structure
    } catch (err: any) {
      setError(err.message ?? "Failed to fetch analysis");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnalysisContext.Provider value={{ changes, loading, error, fetchChanges }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const ctx = useContext(AnalysisContext);
  if (!ctx) throw new Error("useAnalysis must be used inside AnalysisProvider");
  return ctx;
}
