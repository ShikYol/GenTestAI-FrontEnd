// src/features/BugHistory.tsx
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { getHistory } from "../api/feedbackApi";

export default function BugHistory() {
  const [bugs, setBugs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    async function loadHistory() {
      try {
        const data = await getHistory();
        if (mounted) setBugs(data || []);
      } catch (err: any) {
        setError(err?.message || "Failed to load bug history");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadHistory();
    return () => { mounted = false };
  }, []);

  return (
    <Card title="Historical Bug Analysis">
      {loading && <Loader />}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <ul className="space-y-2">
          {bugs.map((item: any, i) => (
            <li key={item.id || i} className="p-2 bg-gray-100 rounded">
              <p className="font-medium">{item.bug || "Unknown Bug"}</p>
              <p className="text-sm text-gray-500">
                Fixed: {item.fixed || "Unresolved"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
