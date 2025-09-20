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
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300`}>
        <Sidebar collapsed={collapsed} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar onToggleSidebar={() => setCollapsed(!collapsed)} />
        <main className="p-6 overflow-auto bg-gradient-to-br from-brand-muted to-white flex-1 rounded-lg shadow-inner">
          {children}
        </main>
      </div>
    </div>
  );
}
