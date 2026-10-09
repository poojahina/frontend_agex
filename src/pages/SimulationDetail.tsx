import { useEffect, useState } from "react";
import { Maximize2, Play, Undo2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { PageHeader } from "../components/common/PageHeader";
import { StatusBadge } from "../components/common/StatusBadge";
import { simulations } from "../data/mockData";

export function SimulationDetail() {
  const { id } = useParams();
  const template = simulations.find((item) => item.id === id) ?? simulations[0];
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [present, setPresent] = useState(false);
  useEffect(() => {
    if (!running || progress >= template.agents.length) return;
    const timer = window.setTimeout(() => setProgress((p) => p + 1), 900);
    return () => window.clearTimeout(timer);
  }, [running, progress, template.agents.length]);
  const complete = progress >= template.agents.length;
  const report = ["Overview", "Key Components", "KYC Verification", "Eligibility Assessment", "Document Validation", "Risk Analysis", "Loan Recommendation", "Final Summary"];
  const content = <div className="space-y-4">{report.map((section) => <section key={section}><h3 className="font-bold text-navy">{section}</h3><p className="mt-1 text-sm leading-6 text-muted">{complete ? `${section} completed with consistent mock evidence, clear assumptions, and an auditable recommendation trail.` : "Run the simulation to generate this section."}</p></section>)}</div>;
  return <div><PageHeader title={template.name} description={template.description} actions={<><button className="btn btn-primary" onClick={() => { setProgress(0); setRunning(true); }}><Play size={16} />Run Simulation</button><button className="btn btn-secondary" onClick={() => setPresent(true)}><Maximize2 size={16} />Present</button><Link className="btn btn-secondary" to="/simulation-lab"><Undo2 size={16} />Back</Link></>} /><div className="grid gap-5 xl:grid-cols-[300px_360px_1fr]"><aside className="surface p-5"><h2 className="font-bold text-navy">Workflow Configuration</h2><Info label="Workflow Name" value={template.name} /><Info label="Industry" value={template.industry} /><Info label="Workflow Objective" value="Evaluate each stage and produce a structured simulation report." /><p className="mt-4 text-sm text-muted">Read More: this demo uses deterministic state transitions and does not call a production LLM.</p></aside><section className="surface max-h-[680px] overflow-auto p-5"><h2 className="font-bold text-navy">Agents</h2><div className="mt-4 space-y-3">{template.agents.map((agent, index) => <div key={agent.id} className="rounded-lg border border-border bg-page p-4"><div className="flex justify-between gap-3"><b className="text-sm text-navy">{agent.name}</b><StatusBadge value={index < progress ? "Completed" : index === progress && running ? "Running" : "Waiting"} /></div><p className="mt-2 text-sm text-muted">{agent.description}</p><button className="btn btn-secondary mt-3">View Activity</button></div>)}</div></section><section className="surface p-5"><h2 className="mb-4 font-bold text-navy">Workflow Output</h2>{content}</section></div>{present ? <div className="fixed inset-0 z-50 overflow-auto bg-white p-8"><div className="mx-auto max-w-5xl"><PageHeader title={`${template.name} Report`} actions={<button className="btn btn-primary" onClick={() => setPresent(false)}>Exit Present</button>} />{content}</div></div> : null}</div>;
}
function Info({ label, value }: { label: string; value: string }) { return <div className="border-b border-border py-3"><b className="text-sm text-muted">{label}</b><p className="mt-1 font-semibold text-navy">{value}</p></div>; }
