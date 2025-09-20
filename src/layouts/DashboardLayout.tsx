// src/layouts/DashboardLayout.tsx
import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import type { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-brand-muted">
      {/* Sidebar (fixed height + background handles gap issue) */}
      <Sidebar collapsed={collapsed} />

      {/* Main Content */}
      <div className="flex flex-1 flex-col min-h-screen">
        <Navbar onToggleSidebar={() => setCollapsed(!collapsed)} />
        <main className="flex-1 p-6 overflow-auto bg-brand-muted">
          {children}
        </main>
      </div>
    </div>
  );
}

