// src/components/Sidebar.tsx
import { NavLink } from "react-router-dom";
import {
  Home,
  Search,
  ListChecks,
  Activity,
  History,
  Settings,
} from "lucide-react";

type SidebarProps = {
  collapsed?: boolean;
};

const links = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Analyzer", path: "/analyzer", icon: Search },
  { name: "Recommender", path: "/recommender", icon: ListChecks },
  { name: "Predictor", path: "/predictor", icon: Activity },
  { name: "History", path: "/history", icon: History },
  { name: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar({ collapsed = false }: SidebarProps) {
  return (
    <aside
      className={`flex flex-col h-screen bg-brand-secondary text-white shadow-md transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <ul className="space-y-2 p-4 flex-1">
        {links.map(({ name, path, icon: Icon }) => (
          <li key={name}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-brand-primary text-white"
                    : "text-gray-200 hover:bg-brand-primary/30"
                }`
              }
            >
              <Icon size={20} />
              {!collapsed && name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
