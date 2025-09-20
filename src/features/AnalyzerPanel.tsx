import { useAnalysis } from "../context/AnalysisContext";
import Card from "../components/Card";
import Loader from "../components/Loader";

export default function AnalyzerPanel() {
  const { analysis, loading, error } = useAnalysis();

  return (
    <Card title="AI Change Analyzer">
      {loading && <Loader />}
      {error && <p className="text-red-600">{error}</p>}
      {analysis && (
        <>
          <p className="text-gray-700 mb-2">{analysis.summary}</p>
          <p>
            Risk:{" "}
            <span className="font-bold text-red-600">{analysis.riskScore}</span>
          </p>
          <p>
            Impacted modules:{" "}
            <span className="font-medium">
              {(analysis.impactedModules || []).join(", ")}
            </span>
          </p>
        </>
      )}
    </Card>
  );
}
