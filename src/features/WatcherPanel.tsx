// src/features/WatcherPanel.tsx
import { useAnalysis } from "../context/AnalysisContext";
import Card from "../components/Card";

export default function WatcherPanel() {
  const { analysis, loading, error } = useAnalysis();

  return (
    <Card title="Code Change Watcher">
      {loading && <p className="text-gray-500">Loading watcher events...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && analysis?.watcherEvents?.length ? (
        <ul className="space-y-2">
          {analysis.watcherEvents.map((e: any, i: number) => (
            <li key={e.id || i} className="p-2 bg-gray-100 rounded">
              <span className="font-medium">{e.file || "Unknown File"}</span> –{" "}
              {e.change || "?"}
            </li>
          ))}
        </ul>
      ) : (
        !loading &&
        !error && (
          <p className="text-gray-600 text-sm">
            No watcher events available
          </p>
        )
      )}
    </Card>
  );
}

