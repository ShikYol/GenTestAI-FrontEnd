// src/services/mockApi.ts

// Helper: simulate network delay
function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Utility: random pick
function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Utility: random ID
function randomId() {
  return Math.random().toString(36).substring(2, 9);
}

export async function mockApiRequest({ service, action, payload }: any) {
  console.log("[MOCK API]", service, action, payload);
  await wait(400); // simulate latency

  // 🔹 AUTH
  if (service === "auth") {
    // ... keep your existing auth mock
  }

  // 🔹 ANALYSIS
  if (service === "analysis") {
    switch (action) {
      case "analyzeChange":
        return {
          summary: randomChoice([
            "Login form validation updated",
            "Payment gateway code refactored",
            "Profile page redesigned",
          ]),
          riskScore: randomChoice(["Low", "Medium", "High"]),
          impactedModules: randomChoice([
            ["Auth", "Forms"],
            ["Payments", "Checkout"],
            ["UI", "Dashboard"],
          ]),
        };

      case "getRecommendations":
        return [
          "Test login with weak password",
          "Test login with special characters",
          "Test login with expired account",
          "Test registration with invalid email format",
        ];

      case "listAnalyses":
        return {
          items: [
            { id: "1", summary: "Login fix", risk: "Medium", date: "2025-09-18" },
            { id: "2", summary: "Payment gateway integration", risk: "High", date: "2025-09-15" },
          ],
          total: 2,
        };
    }
  }

  // 🔹 FEEDBACK
  if (service === "feedback") {
    // ... keep your existing feedback mock
  }

  // 🔹 WATCHER (NEW)
  if (service === "watcher") {
    switch (action) {
      case "events":
        return Array.from({ length: 3 }).map(() => ({
          id: randomId(),
          file: randomChoice([
            "src/App.tsx",
            "src/features/AnalyzerPanel.tsx",
            "src/components/Button.tsx",
            "src/pages/Dashboard.tsx",
          ]),
          change: randomChoice(["modified", "added", "deleted"]),
          timestamp: new Date().toISOString(),
        }));
    }
  }

  throw new Error(`No mock defined for ${service}:${action}`);
}
