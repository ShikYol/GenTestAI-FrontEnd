import DashboardLayout from "../layouts/DashboardLayout";
import AnalyzerPanel from "../features/AnalyzerPanel";
import Card from "../components/Card";

export default function Analyzer() {
  // mock history for hackathon
  const history = [
    { id: "1", summary: "Login form validation updated", risk: "Medium", date: "2025-09-18" },
    { id: "2", summary: "Added payment gateway support", risk: "High", date: "2025-09-15" },
    { id: "3", summary: "UI fixes for dashboard", risk: "Low", date: "2025-09-12" },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Change Analyzer</h1>
        <p className="text-gray-600">
          View detailed AI-powered analysis of code changes, risks, and impacted modules.
        </p>

        {/* Main analysis panel */}
        <AnalyzerPanel />

        {/* Analysis history */}
        <Card title="Past Analyses">
          <ul className="divide-y">
            {history.map((item) => (
              <li key={item.id} className="py-2">
                <p className="font-medium">{item.summary}</p>
                <p className="text-sm text-gray-500">
                  Risk: <span className="font-semibold">{item.risk}</span> — {item.date}
                </p>
              </li>
            ))}
          </ul>
        </Card>

        {/* Placeholder for future features */}
        <Card title="Raw Diff Viewer">
          <p className="text-sm text-gray-600">
            Here you could display the actual code diff or impacted file changes in detail.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
}
