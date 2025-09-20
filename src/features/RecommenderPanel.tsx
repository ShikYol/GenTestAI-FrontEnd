// src/features/RecommenderPanel.tsx
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import Loader from "../components/Loader";
import { getRecommendations } from "../api/analysisApi";

type RecommenderPanelProps = {
  changeId?: string | null;
};

export default function RecommenderPanel({ changeId }: RecommenderPanelProps) {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadRecs() {
      try {
        setLoading(true);
        const recs = await getRecommendations(changeId!); // backend call
        if (mounted) setRecommendations(recs || []);
      } catch (err: any) {
        if (mounted) setError(err.message ?? "Failed to fetch recommendations");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    if (changeId) {
      loadRecs();
    } else {
      // reset if waiting for predictor
      setRecommendations([]);
      setError(null);
      setLoading(false);
    }

    return () => {
      mounted = false;
    };
  }, [changeId]);

  return (
    <Card title="Test Case Recommender">
      {/* Case 1: No analysis yet */}
      {!changeId && (
        <p className="text-brand-secondary/70 text-sm">
          Waiting for analysis before generating test recommendations...
        </p>
      )}

      {/* Case 2: Loading */}
      {loading && <Loader />}

      {/* Case 3: Error */}
      {error && <p className="text-brand-danger">{error}</p>}

      {/* Case 4: Recommendations available */}
      {!loading && !error && changeId && recommendations.length > 0 && (
        <>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            {recommendations.map((rec, i) => (
              <li key={i} className="text-brand-secondary">
                {rec}
              </li>
            ))}
          </ul>
          <Button variant="primary">📤 Export to TestRail</Button>
        </>
      )}

      {/* Case 5: No recommendations returned */}
      {!loading && !error && changeId && recommendations.length === 0 && (
        <p className="text-brand-secondary/70 text-sm">
          No recommendations returned by backend.
        </p>
      )}
    </Card>
  );
}
