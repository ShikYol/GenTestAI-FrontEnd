import { useAnalysis } from "../context/AnalysisContext";
import Card from "../components/Card";

export default function SummaryPanel() {
  const { changes, loading, error } = useAnalysis();

  if (loading) return <Card title="Analysis Summary">Loading...</Card>;
  if (error) return <Card title="Analysis Summary">{error}</Card>;

  return (
    <Card title="Analysis Summary">
      {changes.map((c, i) => (
        <div key={i} className="mb-4">
          <p className="font-medium">{c.record.file_path}</p>
          <ul className="list-disc pl-5">
            {(c.mistralResponse?.analysisResult?.security_issues || []).map(
              (issue: string, idx: number) => (
                <li key={idx}>{issue}</li>
              )
            )}
          </ul>
        </div>
      ))}
    </Card>
  );
}
