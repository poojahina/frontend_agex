import { BarChart3, Bot, Coins, Home, LineChart, MessageSquare, PackageSearch, PlayCircle, Settings, ShieldCheck, Store, Workflow } from "lucide-react";

export const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/workflow-builder", label: "Workflow Builder", icon: Workflow },
  { to: "/my-workflows", label: "My Workflows", icon: PackageSearch },
  { to: "/agents", label: "Agent Catalogue", icon: Bot },
  { to: "/marketplace", label: "AI Marketplace", icon: Store },
  { to: "/simulation-lab", label: "Simulation Lab", icon: PlayCircle },
  { to: "/dashboard-insights", label: "Dashboard Insights", icon: BarChart3 },
  { to: "/observability", label: "AI Observability", icon: LineChart },
  { to: "/cost-utilisation", label: "Cost Utilisation", icon: Coins },
  { to: "/governance", label: "Security & Governance", icon: ShieldCheck },
  { to: "/chat", label: "Workflow Chat", icon: MessageSquare },
  { to: "/settings", label: "Settings", icon: Settings }
];
