// src/pages/Dashboard.tsx
import { useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { useAnalysis } from "../context/AnalysisContext";
import SummaryPanel from "../features/SummaryPanel";
import PredictorPanel from "../features/PredictorPanel";
import RecommenderPanel from "../features/RecommenderPanel";
import Button from "../components/Button";

export default function Dashboard() {
  const { fetchChanges, loading } = useAnalysis();

  // ✅ Auto-run analysis on first load
  useEffect(() => {
    fetchChanges();
  }, []);

  return (
    <DashboardLayout>
      {/* Run Analysis Button */}
      <div className="mb-6">
        <Button
          variant="primary"
          onClick={() => fetchChanges()}
          loading={loading}
          className="w-full md:w-auto"
        >
          {loading ? "Analyzing..." : "Run Analysis"}
        </Button>
      </div>

      {/* Panels in story order */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
        {/* 1. High-level summary */}
        <SummaryPanel />

        {/* 2. Risk & Impact prediction */}
        <PredictorPanel />

        {/* 3. Actionable test recommendations */}
        <RecommenderPanel />
      </div>
    </DashboardLayout>
  );
}
