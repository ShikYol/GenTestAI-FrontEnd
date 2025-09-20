import { useAnalysis } from "../context/AnalysisContext";
import Card from "../components/Card";

export default function BugHistory() {
  const { analysis } = useAnalysis();

  return (
    <Card title="Historical Bug Analysis">
      {analysis?.bugHistory?.length ? (
        <ul className="space-y-2">
          {analysis.bugHistory.map((item: any, i: number) => (
            <li key={item.id || i} className="p-2 bg-gray-100 rounded">
              <p className="font-medium">{item.bug || "Unknown Bug"}</p>
              <p className="text-sm text-gray-500">
                Fixed: {item.fixed || "Unresolved"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bug history available</p>
      )}
    </Card>
  );
}
