import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { UIProvider } from "./context/UIContext";
import { AnalysisProvider } from "./context/AnalysisContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <UIProvider>
        <AnalysisProvider>
          <App />
        </AnalysisProvider>
      </UIProvider>
    </AuthProvider>
  </StrictMode>
);
