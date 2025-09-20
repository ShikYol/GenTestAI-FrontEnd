// src/features/WatcherPanel.tsx
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Loader from "../components/Loader";
import httpClient from "../api/httpClient";

export default function WatcherPanel() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await httpClient.get("/watcher/events");
        if (mounted) setEvents(data || []);
      } catch (err: any) {
        setError(err?.message || "Failed to fetch events");
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false };
  }, []);

  return (
    <Card title="Code Change Watcher">
      {loading && <Loader />}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <ul className="space-y-2">
          {events.map((e: any, i) => (
            <li key={e.id || i} className="p-2 bg-gray-100 rounded">
              <span className="font-medium">{e.file || "Unknown File"}</span> –{" "}
              {e.change || "?"}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

