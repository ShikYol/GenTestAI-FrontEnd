import { useAnalysis } from "../context/AnalysisContext";
import Card from "../components/Card";
import Button from "../components/Button";

export default function RecommenderPanel() {
  const { analysis } = useAnalysis();

  return (
    <Card title="Test Case Recommender">
      {analysis?.recommendations?.length ? (
        <>
          <ul className="list-disc pl-5 space-y-1 mb-3">
            {analysis.recommendations.map((rec: string, i: number) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
          <Button variant="primary">Export to TestRail</Button>
        </>
      ) : (
        <p className="text-gray-600 text-sm">
          No recommendations yet. Run an analysis to see suggestions.
        </p>
      )}
    </Card>
  );
}
