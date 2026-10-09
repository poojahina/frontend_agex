import { ArrowRight, Bot, PlayCircle, ShieldAlert, Workflow } from "lucide-react";
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
      <section className="mb-6 overflow-hidden rounded-2xl bg-navy p-6 text-white shadow-enterprise md:p-8">
        <div className="max-w-4xl">
          <p className="mb-3 text-sm font-semibold text-cyan">Enterprise multi-agent orchestration</p>
          <h1 className="text-3xl font-bold tracking-normal md:text-5xl">Build, Orchestrate and Govern Intelligent AI Agents</h1>
          <p className="mt-4 max-w-3xl leading-7 text-white/78">Design enterprise-grade multi-agent workflows, automate complex tasks, simulate business scenarios, and monitor AI operations from one unified platform.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link className="btn btn-primary" to="/workflow-builder">Create Workflow <ArrowRight size={17} /></Link>
            <Link className="btn border border-white/20 bg-white/10 text-white hover:bg-white/15" to="/simulation-lab">Explore Simulation Lab</Link>
            <Link className="btn bg-white text-navy hover:bg-blue-50" to="/agents">Browse Agent Catalogue</Link>
          </div>
        </div>
      </section>
      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <MetricCard label="Total Workflows" value={workflows.length} icon={Workflow} />
        <MetricCard label="Active Workflows" value={workflows.filter((w) => w.status === "Active").length} />
        <MetricCard label="Available Agents" value={12} icon={Bot} />
        <MetricCard label="Workflow Executions" value={totalExecutions} />
        <MetricCard label="Successful Executions" value="94%" />
        <MetricCard label="Guardrail Alerts" value={4} icon={ShieldAlert} />
      </div>
      <div className="mt-6 grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <section>
          <PageHeader title="Recent Workflows" />
          <div className="grid gap-4 lg:grid-cols-2">
            {workflows.slice(0, 4).map((workflow) => <WorkflowCard key={workflow.id} workflow={workflow} onRun={() => navigate(`/workflow-execution/${workflow.id}`)} />)}
          </div>
        </section>
        <aside className="space-y-5">
          <div className="surface p-5">
            <h2 className="font-bold text-navy">Quick Actions</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {[
                ["Create Workflow", "/workflow-builder"],
                ["Run Simulation", "/simulation-lab"],
                ["Browse Agents", "/agents"],
                ["View Analytics", "/observability"]
              ].map(([label, to]) => <Link key={label} className="btn btn-secondary justify-between" to={to}>{label}<ArrowRight size={16} /></Link>)}
            </div>
          </div>
          <div className="surface p-5">
            <h2 className="font-bold text-navy">Recent Activity</h2>
            <div className="mt-4 space-y-4">
              {["Dashboard architecture approved", "Compliance agent requested human input", "Smart Loan simulation completed", "Cost anomaly reviewed"].map((item, index) => (
                <div key={item} className="flex gap-3 text-sm"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-electric" /><div><b>{item}</b><p className="text-muted">{index + 1}h ago</p></div></div>
              ))}
            </div>
          </div>
        </aside>
      </div>
      <section className="mt-6">
        <PageHeader title="Platform Capabilities" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {["Workflow Orchestration", "Simulation Lab", "AI Observability", "Cost Management", "Governance"].map((name) => <div key={name} className="surface p-5"><PlayCircle className="text-enterprise" /><h3 className="mt-3 font-bold text-navy">{name}</h3><p className="mt-2 text-sm text-muted">Connected controls and mock services for realistic enterprise demos.</p></div>)}
        </div>
      </section>
    </div>
  );
}
