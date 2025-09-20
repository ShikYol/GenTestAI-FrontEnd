import { useAnalysis } from "../context/AnalysisContext";
import Card from "../components/Card";

export default function PredictorPanel() {
  const { changes, loading, error } = useAnalysis();

  if (loading) return <Card title="Risk & Impact Predictor">Loading...</Card>;
  if (error) return <Card title="Risk & Impact Predictor">{error}</Card>;

  return (
    <Card title="Risk & Impact Predictor">
      {changes.map((c, i) => (
        <div key={i} className="mb-4">
          <p className="font-medium">{c.record.file_path}</p>
          <p>Risk Score: {c.mistralResponse?.analysisResult?.risk_score ?? "N/A"}</p>
          <p>
            Edge Cases:{" "}
            {(c.mistralResponse?.analysisResult?.edge_cases || []).join(", ")}
          </p>
        </div>
      ))}
    </Card>
  );
}
