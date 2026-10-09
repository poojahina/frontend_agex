import { ArrowRight, Bot, CircleAlert, CircleCheck, Clock3, MoreHorizontal, Play, ShieldAlert, Workflow } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { MetricCard } from "../components/common/MetricCard";
import { PageHeader } from "../components/common/PageHeader";
import { WorkflowCard } from "../components/common/Cards";
import { useAppStore } from "../store/useAppStore";

export function Home() {
  const workflows = useAppStore((state) => state.workflows);
  const navigate = useNavigate();
  const totalExecutions = workflows.reduce((sum, item) => sum + item.executions, 0);
  return (
    <div>
      <section className="mb-6 flex flex-col justify-between gap-4 border-b border-border pb-5 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted"><span>Operations</span><span className="text-border">/</span><span>Overview</span></div>
          <h1 className="mt-2 text-2xl font-bold text-navy">Agent operations</h1>
          <p className="mt-1 text-sm text-muted">Monitor workflow health, policy posture, and business-critical activity.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link className="btn btn-secondary" to="/simulation-lab">Run simulation</Link>
          <Link className="btn btn-primary" to="/workflow-builder">Create workflow <ArrowRight size={16} /></Link>
        </div>
      </section>
      <section className="mb-6 grid gap-3 rounded-lg border border-border bg-white p-4 md:grid-cols-3">
        <div className="flex items-center gap-3 border-b border-border pb-3 md:border-b-0 md:border-r md:pb-0"><span className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-50 text-success"><CircleCheck size={19} /></span><div><p className="text-sm font-semibold text-navy">Production environment</p><p className="text-xs text-muted">All core services operational</p></div></div>
        <div className="flex items-center gap-3 border-b border-border pb-3 md:border-b-0 md:border-r md:pb-0 md:pl-4"><span className="flex h-9 w-9 items-center justify-center rounded-md bg-amber-50 text-warning"><CircleAlert size={19} /></span><div><p className="text-sm font-semibold text-navy">4 items need review</p><p className="text-xs text-muted">2 policy exceptions, 2 approvals</p></div></div>
        <div className="flex items-center gap-3 md:pl-4"><span className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-50 text-enterprise"><Clock3 size={19} /></span><div><p className="text-sm font-semibold text-navy">Last sync 2 minutes ago</p><p className="text-xs text-muted">US East / Production</p></div></div>
      </section>
      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <MetricCard label="Managed workflows" value={workflows.length} hint="Across 4 business domains" icon={Workflow} />
        <MetricCard label="Active workflows" value={workflows.filter((w) => w.status === "Active").length} hint="No interrupted deployments" />
        <MetricCard label="Available agents" value={12} hint="3 require recertification" icon={Bot} />
        <MetricCard label="Workflow executions" value={totalExecutions.toLocaleString()} hint="Last 30 days" />
        <MetricCard label="Execution success" value="94.2%" hint="Up 1.8% from last period" />
        <MetricCard label="Open guardrails" value={4} hint="2 require human review" icon={ShieldAlert} />
      </div>
      <div className="mt-6 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
        <section className="surface overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-5 py-4"><div><h2 className="font-bold text-navy">Priority workflows</h2><p className="mt-1 text-sm text-muted">Recent production activity and execution posture</p></div><Link className="btn btn-secondary" to="/my-workflows">View all</Link></div>
          <div className="hidden grid-cols-[minmax(0,1.7fr)_90px_82px_88px_32px] gap-3 border-b border-border bg-page px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted md:grid"><span>Workflow</span><span>Runs</span><span>Success</span><span>Status</span><span /></div>
          <div className="divide-y divide-border">
            {workflows.slice(0, 4).map((workflow) => <div key={workflow.id} className="grid gap-3 px-5 py-4 md:grid-cols-[minmax(0,1.7fr)_90px_82px_88px_32px] md:items-center"><div><Link className="font-semibold text-navy hover:text-enterprise" to={`/workflow-execution/${workflow.id}`}>{workflow.name}</Link><p className="mt-1 truncate text-sm text-muted">{workflow.description}</p></div><div className="text-sm font-semibold tabular-nums text-text"><span className="mr-2 text-xs font-medium text-muted md:hidden">Runs</span>{workflow.executions}</div><div className="text-sm font-semibold tabular-nums text-success"><span className="mr-2 text-xs font-medium text-muted md:hidden">Success</span>{workflow.successRate}%</div><div><span className={workflow.status === "Active" ? "inline-flex rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-success" : "inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-muted"}>{workflow.status}</span></div><button className="btn h-8 w-8 px-0 text-muted hover:bg-page hover:text-enterprise" aria-label={`Run ${workflow.name}`} onClick={() => navigate(`/workflow-execution/${workflow.id}`)}><Play size={15} /></button></div>)}
          </div>
        </section>
        <aside className="space-y-5">
          <div className="surface p-5">
            <h2 className="font-bold text-navy">Review queue</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {[["Policy exception", "Human approval required", "/governance", "High"], ["Cost anomaly", "Marketing operations agent", "/cost-utilisation", "Medium"], ["Agent recertification", "Due in 3 days", "/agents", "Low"]].map(([label, detail, to, priority]) => <Link key={label} className="group flex items-center justify-between gap-3 rounded-md border border-border p-3 transition hover:border-electric hover:bg-blue-50" to={to}><div><p className="text-sm font-semibold text-navy">{label}</p><p className="mt-1 text-xs text-muted">{detail}</p></div><span className={priority === "High" ? "text-xs font-semibold text-danger" : priority === "Medium" ? "text-xs font-semibold text-warning" : "text-xs font-semibold text-muted"}>{priority}</span></Link>)}
            </div>
          </div>
          <div className="surface p-5">
            <div className="flex items-center justify-between"><h2 className="font-bold text-navy">Activity feed</h2><button className="btn h-8 w-8 px-0 text-muted" aria-label="More activity options"><MoreHorizontal size={18} /></button></div>
            <div className="mt-4 space-y-4">
              {["Claims triage policy approved", "Compliance agent requested input", "Smart loan simulation completed", "Cost anomaly assigned to FinOps"].map((item, index) => (
                <div key={item} className="flex gap-3 text-sm"><span className={index === 1 ? "mt-1.5 h-2 w-2 rounded-full bg-warning" : "mt-1.5 h-2 w-2 rounded-full bg-electric"} /><div><b className="font-semibold text-text">{item}</b><p className="mt-1 text-xs text-muted">{index + 1}h ago</p></div></div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
