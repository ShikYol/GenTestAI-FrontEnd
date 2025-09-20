import { useAnalysis } from "../context/AnalysisContext";
import Card from "../components/Card";

export default function SummaryPanel() {
  const { analysis } = useAnalysis();

  return (
    <Card title="Analysis Summary">
      {analysis?.summary ? (
        <p className="mb-2 text-gray-700">{analysis.summary}</p>
      ) : (
        <p>No summary available</p>
      )}

      {analysis?.stats && (
        <ul className="text-sm text-gray-600 list-disc pl-5">
          {Object.entries(analysis.stats).map(([key, value], i) => (
            <li key={i}>
              {key}: <span className="font-medium">{String(value)}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
