// src/features/SummaryPanel.tsx
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";
import httpClient from "../api/httpClient";

export default function SummaryPanel() {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    async function fetchSummary() {
      try {
        // Example endpoint — replace with your backend’s real one
        const data = await httpClient.get("/analysis/summary");
        if (mounted) setSummary(data);
      } catch (err: any) {
        if (mounted) setError(err?.message || "Failed to fetch summary");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchSummary();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Card title="Analysis Summary">
      {loading && <Loader />}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && summary && (
        <div>
          <p className="mb-2 text-gray-700">
            {summary.text || "No summary available"}
          </p>
          {summary.stats && (
            <ul className="text-sm text-gray-600 list-disc pl-5">
              {Object.entries(summary.stats).map(([key, value], i) => (
                <li key={i}>
                  {key}: <span className="font-medium">{String(value)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Card>
  );
}
