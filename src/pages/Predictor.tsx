import DashboardLayout from "../layouts/DashboardLayout";
import PredictorPanel from "../features/PredictorPanel";

export default function Predictor() {
  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Risk & Impact Predictor</h1>
        <p className="text-gray-600 mb-6">
          The predictor evaluates the potential risks and module impacts of 
          recent changes. This helps testers and developers anticipate 
          high-risk areas before deployment.
        </p>

        <PredictorPanel />
      </div>
    </DashboardLayout>
  );
}
