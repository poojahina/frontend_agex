import { Link } from "react-router-dom";
import { BarChart3, Coins, ShieldCheck } from "lucide-react";
import { PageHeader } from "../components/common/PageHeader";

export function DashboardInsights() {
  return <div><PageHeader title="Dashboard Insights" description="Operational intelligence entry point for observability, cost, and guardrails." /><div className="grid gap-5 md:grid-cols-3">{[
    ["AI Observability", "Monitor model performance, latency, usage metrics, and operational health.", "/observability", BarChart3],
    ["Cost Utilisation", "Track token consumption, infrastructure costs, and utilization trends.", "/cost-utilisation", Coins],
    ["Guardrails", "Review compliance metrics, safety policies, and governance controls.", "/governance", ShieldCheck]
  ].map(([title, text, to, Icon]) => { const I = Icon as typeof BarChart3; return <article key={title as string} className="surface p-6"><I className="text-enterprise" /><h2 className="mt-4 text-xl font-bold text-navy">{title as string}</h2><p className="mt-3 min-h-20 text-sm leading-6 text-muted">{text as string}</p><Link className="btn btn-primary mt-4" to={to as string}>View Details</Link></article>; })}</div></div>;
}
