import { useAnalysis } from "../context/AnalysisContext";
import Card from "../components/Card";

export default function RecommenderPanel() {
  const { changes, loading, error } = useAnalysis();

  if (loading) return <Card title="Test Case Recommender">Loading...</Card>;
  if (error) return <Card title="Test Case Recommender">{error}</Card>;

  return (
    <Card title="Test Case Recommender">
      {changes.map((c, i) => (
        <div key={i} className="mb-4">
          <p className="font-medium">{c.record.file_path}</p>
          <ul className="list-disc pl-5">
            {(c.aiResponse?.testCases || []).map((t: any) => (
              <li key={t.id}>{t.description}</li>
            ))}
          </ul>
        </div>
      ))}
    </Card>
  );
}
