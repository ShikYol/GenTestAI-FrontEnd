import { useLocation } from "react-router-dom";
import { useUI } from "../context/UIContext";

type NavbarProps = {
  onToggleSidebar?: () => void;
};

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  const { pathname } = useLocation();
  const { message, clearMessage } = useUI();

  const titles: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/analyzer": "Analyzer",
    "/recommender": "Recommender",
    "/predictor": "Predictor",
    "/history": "Bug History",
    "/settings": "Settings",
    "/login": "Sign In",
    "/register": "Sign Up",
  };

  return (
    <nav className="w-full h-14 bg-brand-primary text-white flex items-center justify-between px-6 shadow relative">
      <div className="flex items-center gap-4">
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="px-3 py-1 rounded bg-brand-secondary hover:bg-brand-secondary/80"
          >
            ☰
          </button>
        )}
        <h1 className="text-xl font-bold"> GenTestAI : AI Powered Testing</h1>
      </div>
      <span className="text-sm font-medium">
        {titles[pathname] || "Welcome"}
      </span>

      {/* Global Message Banner */}
      {message && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-brand-secondary text-white px-4 py-2 rounded shadow z-50 flex items-center gap-2">
          <span>{message}</span>
          <button
            onClick={clearMessage}
            className="ml-2 text-sm underline hover:text-brand-muted"
          >
            Dismiss
          </button>
        </div>
      )}
    </nav>
  );
}
