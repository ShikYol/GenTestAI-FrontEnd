// src/features/AnalyzerPanel.tsx
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { analyzeChange } from "../api/analysisApi";

type AnalyzerPanelProps = {
  onAnalysisComplete?: (changeId: string) => void;
};

export default function AnalyzerPanel({ onAnalysisComplete }: AnalyzerPanelProps) {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let mounted = true;

    async function runAnalysis() {
      try {
        const res = await analyzeChange({ diff: "fake-diff", files: ["src/App.tsx"] });
        if (mounted) {
          setResult(res);
          if (res?.id && onAnalysisComplete) {
            onAnalysisComplete(res.id);
          }
        }
      } catch (err: any) {
        if (mounted) setError(err?.message || "Analysis failed");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    runAnalysis();
    return () => {
      mounted = false;
    };
  }, [onAnalysisComplete]);

  return (
    <Card title="AI Change Analyzer">
      {loading && <Loader />}
      {error && <p className="text-brand-danger">{error}</p>}
      {result && (
        <div>
          <p className="text-brand-secondary mb-2">{result.summary}</p>
          <p>
            Risk:{" "}
            <span className="font-bold text-brand-danger">{result.riskScore}</span>
          </p>
          <p>
            Impacted modules:{" "}
            <span className="font-medium text-brand-accent">
              {(result.impactedModules || []).join(", ")}
            </span>
          </p>
        </div>
      )}
    </Card>
  );
}
