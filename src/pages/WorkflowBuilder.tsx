import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Edit3, Play, Plus, Save, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/common/PageHeader";
import { AgentCard } from "../components/common/Cards";
import { StatusBadge } from "../components/common/StatusBadge";
import { recommendedAgents } from "../data/mockData";
import { useAppStore } from "../store/useAppStore";
import { Agent } from "../types";

const steps = ["Setup", "Requirements", "Review", "Agents", "Save & Run"];

export function WorkflowBuilder() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Record<string, string>>({
    name: "Unified Dashboard Deployment Process",
    domain: "Business Intelligence",
    industry: "Horizontal",
    description: "Design and deploy a unified dashboard that integrates data from AWS, Azure, and Google Cloud for weekly project progress monitoring.",
    problem: "Project data is fragmented across cloud and operational systems.",
    outcome: "A governed dashboard blueprint with integration, UX, adoption, and compliance plans.",
    executionType: "Semi-Autonomous",
    human: "Require approvals for compliance and adoption milestones"
  });
  const [answers, setAnswers] = useState<Record<string, string>>({ source: "Cloud platforms", objective: "Project progress tracking", visualization: "KPI summary cards", refresh: "Weekly", users: "Managers and team leads" });
  const [agents, setAgents] = useState<Agent[]>(recommendedAgents);
  const addWorkflow = useAppStore((state) => state.addWorkflow);
  const navigate = useNavigate();
  const summary = useMemo(() => `A ${answers.refresh?.toLowerCase()} dashboard for ${answers.users?.toLowerCase()} focused on ${answers.objective?.toLowerCase()}, connecting primarily to ${answers.source?.toLowerCase()} with ${answers.visualization?.toLowerCase()}.`, [answers]);
  const save = (status: "Draft" | "Active" | "Published") => {
    const id = `w-${Date.now()}`;
    addWorkflow({ id, name: form.name, description: form.description, domain: form.domain, industry: form.industry, status, agents, lastExecution: "Not run yet", executions: 0, successRate: 0 });
    navigate(status === "Active" ? `/workflow-execution/${id}` : "/my-workflows");
  };
  return (
    <div>
      <PageHeader title="Workflow Builder" description="Five-step guided workflow creation with deterministic mock requirement synthesis and agent sequencing." />
      <div className="surface mb-5 overflow-x-auto p-3">
        <div className="flex min-w-[680px] gap-2">
          {steps.map((item, index) => <button key={item} className={`flex-1 rounded-lg px-3 py-3 text-sm font-semibold ${index === step ? "bg-enterprise text-white" : index < step ? "bg-blue-50 text-enterprise" : "bg-page text-muted"}`} onClick={() => setStep(index)}>{index + 1}. {item}</button>)}
        </div>
      </div>
      {step === 0 && <Setup form={form} setForm={setForm} />}
      {step === 1 && <Requirements answers={answers} setAnswers={setAnswers} summary={summary} />}
      {step === 2 && <Review form={form} summary={summary} agents={agents} />}
      {step === 3 && <Agents agents={agents} setAgents={setAgents} />}
      {step === 4 && <SaveRun save={save} />}
      <div className="mt-5 flex justify-between">
        <button className="btn btn-secondary" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>Back</button>
        <button className="btn btn-primary" disabled={step === steps.length - 1} onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}>Next</button>
      </div>
    </div>
  );
}

function Setup({ form, setForm }: { form: Record<string, string>; setForm: (value: Record<string, string>) => void }) {
  const fields = ["name", "domain", "industry", "description", "problem", "outcome", "executionType", "human"];
  return <div className="surface grid gap-4 p-5 md:grid-cols-2">{fields.map((field) => <label key={field} className="grid gap-2 md:[&:nth-child(4)]:col-span-2 md:[&:nth-child(5)]:col-span-2 md:[&:nth-child(6)]:col-span-2"><span className="label capitalize">{field.replace(/([A-Z])/g, " $1")}</span><textarea className="input min-h-11 resize-y" value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} /></label>)}</div>;
}

function Requirements({ answers, setAnswers, summary }: { answers: Record<string, string>; setAnswers: (value: Record<string, string>) => void; summary: string }) {
  const questions = [
    ["source", "Data Sources", ["Company databases", "Internal or third-party APIs", "Spreadsheets", "Cloud platforms", "Other"]],
    ["objective", "Primary Business Objective", ["Project progress tracking", "Financial monitoring", "Operational efficiency", "Resource utilization", "Other"]],
    ["visualization", "Visualization Preferences", ["Interactive tables", "Charts and graphs", "KPI summary cards", "Filters and drilldowns", "Reports"]],
    ["refresh", "Refresh Frequency", ["Real time", "Hourly", "Daily", "Weekly", "Monthly"]],
    ["users", "Primary Users", ["Executives and senior management", "Managers and team leads", "Analysts and data specialists", "General staff and end users", "Other"]]
  ] as const;
  return <div className="grid gap-5 xl:grid-cols-2"><div className="surface p-5"><h2 className="font-bold text-navy">Tailored Clarification Questionnaire</h2><div className="mt-4 space-y-5">{questions.map(([key, title, options]) => <div key={key}><p className="label">{title}</p><div className="mt-2 grid gap-2 sm:grid-cols-2">{options.map((option) => <button key={option} className={`rounded-lg border p-3 text-left text-sm ${answers[key] === option ? "border-electric bg-blue-50 text-enterprise" : "border-border bg-white text-text"}`} onClick={() => setAnswers({ ...answers, [key]: option })}>{option}</button>)}</div></div>)}</div></div><div className="surface p-5"><h2 className="font-bold text-navy">Synthesized Technical Requirements</h2><p className="mt-3 rounded-lg bg-page p-4 text-sm leading-6 text-text">{summary}</p>{["Requirements Summary", "Refined Scope", "Key Requirements", "Assumptions", "Constraints", "Recommended Technical Considerations"].map((item) => <div key={item} className="mt-3 border-t border-border pt-3"><b className="text-sm text-navy">{item}</b><p className="mt-1 text-sm text-muted">Generated deterministically from the selected questionnaire responses and ready for a future LLM service.</p></div>)}<button className="btn btn-primary mt-4">Regenerate Requirements</button></div></div>;
}

function Review({ form, summary, agents }: { form: Record<string, string>; summary: string; agents: Agent[] }) {
  const [mode, setMode] = useState("Auto");
  return <div className="surface p-5"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="font-bold text-navy">Analyzed Workflow Review</h2><div className="rounded-lg bg-page p-1"><button className={`btn ${mode === "Auto" ? "btn-primary" : ""}`} onClick={() => setMode("Auto")}>Auto</button><button className={`btn ${mode === "Manual" ? "btn-primary" : ""}`} onClick={() => setMode("Manual")}>Manual</button></div></div><div className="mt-5 grid gap-4 md:grid-cols-2"><Info title="Workflow Overview" value={form.description} /><Info title="Refined Business Requirements" value={summary} /><Info title="Technical Architecture Summary" value="Cloud ingestion, semantic metric layer, dashboard UX, adoption plan, and governance review." /><Info title="Execution Strategy" value={`${mode} sequencing with human input required for compliance-sensitive steps.`} /></div><h3 className="mt-5 font-bold text-navy">Proposed Agent Sequence</h3><div className="mt-3 grid gap-3 lg:grid-cols-2">{agents.map((agent, index) => <div key={agent.id} className="rounded-lg border border-border bg-page p-3 text-sm"><b>{index + 1}. {agent.name}</b><p className="mt-1 text-muted">{agent.description}</p></div>)}</div></div>;
}

function Info({ title, value }: { title: string; value: string }) { return <div className="rounded-lg border border-border bg-page p-4"><b className="text-sm text-navy">{title}</b><p className="mt-2 text-sm leading-6 text-muted">{value}</p></div>; }

function Agents({ agents, setAgents }: { agents: Agent[]; setAgents: (agents: Agent[]) => void }) {
  const move = (index: number, delta: number) => { const next = [...agents]; const [item] = next.splice(index, 1); next.splice(index + delta, 0, item); setAgents(next); };
  return <div className="grid gap-4"><div className="flex flex-wrap gap-2"><button className="btn btn-primary" onClick={() => setAgents([...agents, { ...recommendedAgents[0], id: `custom-${Date.now()}`, name: "Custom Coordination Agent" }])}><Plus size={16} />Add Custom Agent</button><button className="btn btn-secondary">Add from Agent Catalogue</button><button className="btn btn-secondary">Add AI Foundry Agent</button></div>{agents.map((agent, index) => <AgentCard key={agent.id} agent={agent} actions={<><button className="btn btn-secondary" onClick={() => move(index, -1)} disabled={index === 0}><ArrowUp size={15} /></button><button className="btn btn-secondary" onClick={() => move(index, 1)} disabled={index === agents.length - 1}><ArrowDown size={15} /></button><button className="btn btn-secondary"><Edit3 size={15} />Edit</button><button className="btn btn-danger" onClick={() => setAgents(agents.filter((item) => item.id !== agent.id))}><Trash2 size={15} />Delete</button></>} />)}</div>;
}

function SaveRun({ save }: { save: (status: "Draft" | "Active" | "Published") => void }) {
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[
    ["Save as Draft", "Save workflow configuration for future editing.", "Draft"],
    ["Save and Run Now", "Save and execute the workflow immediately.", "Active"],
    ["Save and Publish as API", "Generate a demo endpoint preview for integration planning.", "Published"],
    ["Schedule Workflow", "Configure daily, weekly, or monthly demo scheduling.", "Draft"]
  ].map(([title, text, status]) => <div key={title} className="surface p-5"><Save className="text-enterprise" /><h3 className="mt-3 font-bold text-navy">{title}</h3><p className="mt-2 min-h-16 text-sm text-muted">{text}</p>{title.includes("API") ? <code className="mt-2 block rounded bg-page p-2 text-xs">/demo/api/workflows/unified-dashboard</code> : null}{title.includes("Schedule") ? <div className="mt-2 grid gap-2"><select className="input"><option>Weekly</option><option>Daily</option><option>Monthly</option></select><input className="input" type="time" defaultValue="09:00" /></div> : null}<button className="btn btn-primary mt-4 w-full" onClick={() => save(status as "Draft" | "Active" | "Published")}><Play size={16} />{title}</button><div className="mt-3"><StatusBadge value="Demo only" /></div></div>)}</div>;
}
