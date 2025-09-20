import DashboardLayout from "../layouts/DashboardLayout";
import BugHistoryPanel from "../features/BugHistory";

export default function BugHistory() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Bug History</h1>
        <p className="text-gray-600 mb-6">
          View past bugs, their resolution status, and insights from previous 
          analyses. Use this page to identify recurring issues and improve 
          testing strategies over time.
        </p>
        <BugHistoryPanel />
      </div>
    </DashboardLayout>
  );
}
