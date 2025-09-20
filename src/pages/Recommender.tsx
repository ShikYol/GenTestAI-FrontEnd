import { useNavigate } from "react-router-dom";
import RecommenderPanel from "../features/RecommenderPanel";
import Button from "../components/Button";
import DashboardLayout from "../layouts/DashboardLayout";

export default function Recommender() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Test Case Recommender</h1>
        <p className="text-gray-600">
          The recommender suggests useful test cases based on code changes,
          analysis results, and historical bugs. Use this page to explore
          recommended scenarios in more depth and export them to your test suite.
        </p>

        {/* ✅ Panel handles its own fetching/mocks */}
        <RecommenderPanel changeId="demo-change-123" />

        <div className="mt-6">
          <Button variant="secondary" onClick={() => navigate("/dashboard")}>
            ⬅ Back to Dashboard
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
