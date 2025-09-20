// src/features/FeedbackPanel.tsx
import { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import { useAnalysis } from "../context/AnalysisContext";

export default function FeedbackPanel() {
  const { analysis } = useAnalysis();
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleFeedback(useful: boolean) {
    if (!analysis?.id) {
      setMessage("⚠ No analysis selected to give feedback on.");
      return;
    }

    setSubmitting(true);
    setMessage(null);
    try {
      // Replace this with a real API call later if backend supports feedback
      // For now just simulate success
      await new Promise((res) => setTimeout(res, 500));

      setMessage("✅ Thank you for your feedback!");
    } catch (err: any) {
      setMessage("❌ Failed to submit feedback");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card title="Tester Feedback">
      <p className="mb-3 text-brand-muted">
        Was this recommendation useful?
      </p>
      <div className="flex gap-2">
        <Button
          variant="primary"
          loading={submitting}
          onClick={() => handleFeedback(true)}
        >
          👍 Yes
        </Button>
        <Button
          variant="secondary"
          loading={submitting}
          onClick={() => handleFeedback(false)}
        >
          👎 No
        </Button>
      </div>
      {message && (
        <p className="mt-2 text-sm text-brand-accent">{message}</p>
      )}
    </Card>
  );
}
