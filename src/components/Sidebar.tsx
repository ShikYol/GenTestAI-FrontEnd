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
      className={`h-screen bg-brand-secondary text-white transition-all duration-300 shadow-lg ${
        collapsed ? "w-16" : "w-60"
      }`}
    >
      <ul className="space-y-2 p-4">
        {links.map(({ name, path, icon: Icon }) => (
          <li key={name}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-brand-primary text-white"
                    : "text-gray-300 hover:bg-brand-primary/30 hover:text-white"
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
