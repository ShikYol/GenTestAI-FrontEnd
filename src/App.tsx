import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Analyzer from "./pages/Analyzer";
import Recommender from "./pages/Recommender";
import Predictor from "./pages/Predictor";
import BugHistory from "./pages/BugHistory";
import PrivateRoute from "./routes/PrivateRoute";
import GlobalUI from "./components/GlobalUI"; // ✅ import

export default function App() {
  return (
    <BrowserRouter>
      <GlobalUI /> {/* ✅ Always mounted */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />

        <Route
          path="/analyzer"
          element={
            <PrivateRoute>
              <Analyzer />
            </PrivateRoute>
          }
        />

        <Route
          path="/recommender"
          element={
            <PrivateRoute>
              <Recommender />
            </PrivateRoute>
          }
        />

        <Route
          path="/predictor"
          element={
            <PrivateRoute>
              <Predictor />
            </PrivateRoute>
          }
        />

        <Route
          path="/history"
          element={
            <PrivateRoute>
              <BugHistory />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
