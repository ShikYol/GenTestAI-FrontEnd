import { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import { submitFeedback } from "../api/feedbackApi";

export default function FeedbackPanel() {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleFeedback(useful: boolean) {
    setSubmitting(true);
    setMessage(null);
    try {
      await submitFeedback({
        targetId: "current-analysis-id",
        targetType: "analysis",
        useful,
      });
      setMessage("✅ Thank you for your feedback!");
    } catch (err: any) {
      setMessage("❌ Failed to submit feedback");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card title="Tester Feedback">
      <p className="mb-3 text-brand-muted">Was this recommendation useful?</p>
      <div className="flex gap-2">
        <Button variant="primary" loading={submitting} onClick={() => handleFeedback(true)}>
          👍 Yes
        </Button>
        <Button variant="secondary" loading={submitting} onClick={() => handleFeedback(false)}>
          👎 No
        </Button>
      </div>
      {message && <p className="mt-2 text-sm text-brand-accent">{message}</p>}
    </Card>
  );
}
