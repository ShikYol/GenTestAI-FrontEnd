import { useAnalysis } from "../context/AnalysisContext";
import Card from "../components/Card";
import Loader from "../components/Loader";

export default function PredictorPanel() {
  const { analysis, loading, error } = useAnalysis();

  return (
    <Card title="Risk & Impact Predictor">
      {loading && <Loader />}
      {error && <p className="text-red-600">{error}</p>}
      {analysis && (
        <>
          <p className="text-gray-700">
            Change Risk Score:{" "}
            <span className="text-red-600 font-bold">
              {analysis.riskScore || "Unknown"}
            </span>
          </p>
          <p className="mt-2">
            Modules impacted:{" "}
            <span className="font-medium">
              {(analysis.impactedModules || []).join(", ")}
            </span>
          </p>
        </>
      )}
    </Card>
  );
}
