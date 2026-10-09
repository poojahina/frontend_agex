import { useEffect, useMemo, useState } from "react";
import { Download, MessageSquare, Square, ThumbsUp } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "../components/common/PageHeader";
import { StatusBadge } from "../components/common/StatusBadge";
import { useAppStore } from "../store/useAppStore";
import { Status } from "../types";

export function WorkflowExecution() {
  const { id } = useParams();
  const workflow = useAppStore((state) => state.workflows.find((item) => item.id === id) ?? state.workflows[0]);
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (paused || stopped || current >= workflow.agents.length - 1) return;
    const timer = window.setTimeout(() => {
      if (workflow.agents[current + 1]?.humanInputRequired) setPaused(true);
      setCurrent((value) => Math.min(workflow.agents.length - 1, value + 1));
    }, 1300);
    return () => window.clearTimeout(timer);
  }, [current, paused, stopped, workflow.agents]);
  const status: Status = stopped ? "Failed" : paused ? "Human Input Required" : current === workflow.agents.length - 1 ? "Completed" : "Running";
  const active = workflow.agents[current];
  const nodes = useMemo(() => ["User Proxy", "Orchestrator", ...workflow.agents.map((a) => a.name)], [workflow.agents]);
  return (
    <div>
      <PageHeader title={workflow.name} description="Live-style deterministic execution monitor with structured summaries only." actions={<><StatusBadge value={status} /><button className="btn btn-secondary"><ThumbsUp size={16} />Feedback</button><button className="btn btn-secondary">Evaluation</button><button className="btn btn-secondary" onClick={() => navigate("/chat")}><MessageSquare size={16} />Go to Chat</button><button className="btn btn-secondary"><Download size={16} />Download Report</button><button className="btn btn-danger" onClick={() => setStopped(true)}><Square size={16} />Stop Execution</button></>} />
      <div className="grid gap-5 xl:grid-cols-[320px_1fr]">
        <aside className="surface p-5">
          <h2 className="font-bold text-navy">Agent Execution Pipeline</h2>
          <div className="mt-4 space-y-3">
            {nodes.map((node, index) => {
              const agentIndex = index - 2;
              const nodeStatus = index < current + 2 ? "Completed" : index === current + 2 ? status : "Waiting";
              return <div key={node} className="flex gap-3"><span className={`mt-1 h-3 w-3 rounded-full ${nodeStatus === "Completed" ? "bg-success" : nodeStatus === "Running" ? "bg-electric" : nodeStatus === "Human Input Required" ? "bg-warning" : "bg-border"}`} /><div><b className="text-sm text-navy">{node}</b><div className="mt-1"><StatusBadge value={agentIndex === current ? status : nodeStatus} /></div></div></div>;
            })}
          </div>
        </aside>
        <section className="surface p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div><p className="text-sm font-semibold text-muted">Current Agent</p><h2 className="mt-1 text-xl font-bold text-navy">{active.name}</h2></div><StatusBadge value={status} />
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Panel title="Agent Reasoning Summary" text={`${active.name} is producing a concise user-facing summary based on prior outputs, business constraints, and validation rules.`} />
            <Panel title="Input" text="Workflow configuration, questionnaire outputs, execution history, and approved upstream artifacts." />
            <Panel title="Output" text={paused ? "Awaiting human approval before finalizing this stage." : "Structured execution event and stage artifact generated for downstream agents."} />
            <Panel title="Execution Duration" text={`${32 + current * 9}s | Timestamp ${new Date().toLocaleTimeString()}`} />
          </div>
          {paused ? <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-5"><h3 className="font-bold text-navy">Human Input Required</h3><p className="mt-2 text-sm text-muted">{active.name} asks: approve the compliance-sensitive recommendation before the workflow continues?</p><div className="mt-4 flex flex-wrap gap-2"><button className="btn btn-primary" onClick={() => setPaused(false)}>Approve and Resume</button><button className="btn btn-danger" onClick={() => setStopped(true)}>Reject and Terminate</button><input className="input max-w-md" placeholder="Provide input for the agent" /></div></div> : null}
          <h3 className="mt-6 font-bold text-navy">Execution Events</h3>
          <div className="mt-3 space-y-2">{workflow.agents.slice(0, current + 1).map((agent, index) => <div key={agent.id} className="rounded-lg border border-border bg-page p-3 text-sm"><b>{agent.name}</b><p className="text-muted">{index === current ? "Currently processing the stage." : "Completed structured event and passed output forward."}</p></div>)}</div>
        </section>
      </div>
    </div>
  );
}
function Panel({ title, text }: { title: string; text: string }) { return <div className="rounded-lg border border-border bg-page p-4"><b className="text-sm text-navy">{title}</b><p className="mt-2 text-sm leading-6 text-muted">{text}</p></div>; }
