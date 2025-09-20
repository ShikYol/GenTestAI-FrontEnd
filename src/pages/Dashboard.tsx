import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import WatcherPanel from "../features/WatcherPanel";
import AnalyzerPanel from "../features/AnalyzerPanel";
import PredictorPanel from "../features/PredictorPanel";
import SummaryPanel from "../features/SummaryPanel";
import RecommenderPanel from "../features/RecommenderPanel";
import FeedbackPanel from "../features/FeedbackPanel";
import BugHistory from "../features/BugHistory";

export default function Dashboard() {
  const [changeId, setChangeId] = useState<string | null>(null);

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
        <WatcherPanel />
        <AnalyzerPanel />
        <PredictorPanel onPredictionComplete={(id) => setChangeId(id)} />
        <SummaryPanel />
        {/* Always render Recommender, even if no changeId yet */}
        <RecommenderPanel changeId={changeId} />
        <FeedbackPanel />
        <BugHistory />
      </div>
    </DashboardLayout>
  );
}
