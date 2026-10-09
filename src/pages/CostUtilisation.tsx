import { Download } from "lucide-react";
import { ReactNode } from "react";
import { PageHeader } from "../components/common/PageHeader";
import { MetricCard } from "../components/common/MetricCard";
import { BarMetricChart, TrendChart } from "../components/common/Charts";
import { telemetry } from "../data/mockData";

export function CostUtilisation() {
  const total = telemetry.reduce((sum, p) => sum + (p.cost ?? 0), 0);
  const tokens = telemetry.reduce((sum, p) => sum + (p.tokens ?? 0), 0);
  const exportCsv = () => {
    const csv = ["day,cost,tokens", ...telemetry.map((p) => `${p.name},${p.cost},${p.tokens}`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "mock-ai-costs.csv";
    link.click();
  };
  return <div><PageHeader title="Cost Utilisation" description="All values are mock estimates for AI operations planning." actions={<button className="btn btn-primary" onClick={exportCsv}><Download size={16} />CSV export</button>} /><div className="surface mb-5 grid gap-3 p-4 md:grid-cols-3"><select className="input"><option>Last 7 days</option></select><select className="input"><option>All Workflows</option></select><select className="input"><option>All Models</option><option>GPT family estimate</option></select></div><div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6"><MetricCard label="Total Estimated AI Cost" value={`$${total}`} /><MetricCard label="Input Tokens" value={Math.round(tokens * 0.58).toLocaleString()} /><MetricCard label="Output Tokens" value={Math.round(tokens * 0.42).toLocaleString()} /><MetricCard label="Average Cost per Execution" value="$0.71" /><MetricCard label="Most Expensive Workflow" value="Unified Dashboard" /><MetricCard label="Estimated Infrastructure Cost" value="$214" /></div><div className="mt-5 grid gap-5 xl:grid-cols-2"><Chart title="Daily AI Spending"><TrendChart data={telemetry} dataKey="cost" /></Chart><Chart title="Cost by Workflow"><BarMetricChart data={[{ name: "Dashboard", cost: 188 }, { name: "Loan", cost: 144 }, { name: "Retail", cost: 90 }]} /></Chart><Chart title="Token Usage Trends"><BarMetricChart data={telemetry} dataKey="tokens" /></Chart><Chart title="Cost by Model"><BarMetricChart data={[{ name: "GPT-5", cost: 236 }, { name: "GPT-4.1", cost: 166 }, { name: "Embedding", cost: 42 }]} /></Chart></div></div>;
}
function Chart({ title, children }: { title: string; children: ReactNode }) { return <div className="surface p-5"><h2 className="mb-4 font-bold text-navy">{title}</h2>{children}</div>; }
