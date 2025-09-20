// src/features/PredictorPanel.tsx
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { analyzeChange } from "../api/analysisApi";
import Loader from "../components/Loader";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

type PredictorPanelProps = {
  onPredictionComplete?: (changeId: string) => void;
};

export default function PredictorPanel({ onPredictionComplete }: PredictorPanelProps) {
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function runPrediction() {
      try {
        const data = await analyzeChange({ diff: "mock-diff" });
        if (mounted) {
          setPrediction(data);
          if (data?.id && onPredictionComplete) {
            onPredictionComplete(data.id);
          }
        }
      } catch (err: any) {
        if (mounted) setError(err.message ?? "Failed to fetch prediction");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    runPrediction();
    return () => {
      mounted = false;
    };
  }, [onPredictionComplete]);

  const riskColors: Record<string, string> = {
    Low: "bg-green-500 text-white",
    Medium: "bg-yellow-500 text-black",
    High: "bg-red-600 text-white",
  };

  const chartData =
    prediction?.impactedModules?.map((mod: string) => ({
      module: mod,
      risk:
        prediction.riskScore === "High"
          ? 90
          : prediction.riskScore === "Medium"
          ? 60
          : 30,
    })) || [];

  return (
    <Card title="Risk & Impact Predictor">
      {loading && <Loader />}
      {error && <p className="text-brand-danger">{error}</p>}

      {!loading && !error && prediction && (
        <div className="space-y-4">
          <div>
            <span className="text-brand-secondary font-medium">Change Risk Score:</span>
            <span
              className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
                riskColors[prediction.riskScore] || "bg-gray-300"
              }`}
            >
              {prediction.riskScore || "Unknown"}
            </span>
          </div>

          {prediction.impactedModules?.length > 0 && (
            <p className="text-brand-secondary">
              Impacted modules:{" "}
              <span className="font-medium text-brand-accent">
                {prediction.impactedModules.join(", ")}
              </span>
            </p>
          )}

          {chartData.length > 0 && (
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="module" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="risk"
                    fill={
                      prediction.riskScore === "High"
                        ? "#ef4444"
                        : prediction.riskScore === "Medium"
                        ? "#f59e0b"
                        : "#10b981"
                    }
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
