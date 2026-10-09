import { ReactNode } from "react";
import { Agent, Workflow } from "../../types";
import { StatusBadge } from "./StatusBadge";

export function WorkflowCard({ workflow, onRun }: { workflow: Workflow; onRun?: () => void }) {
  return (
    <article className="surface p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-navy">{workflow.name}</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{workflow.description}</p>
        </div>
        <StatusBadge value={workflow.status} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
        <div><span className="block text-muted">Agents</span><b>{workflow.agents.length}</b></div>
        <div><span className="block text-muted">Runs</span><b>{workflow.executions}</b></div>
        <div><span className="block text-muted">Success</span><b>{workflow.successRate}%</b></div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="text-xs text-muted">Last execution: {workflow.lastExecution}</span>
        {onRun ? <button className="btn btn-secondary" onClick={onRun}>Run</button> : null}
      </div>
    </article>
  );
}

export function AgentCard({ agent, actions }: { agent: Agent; actions?: ReactNode }) {
  return (
    <article className="surface p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-navy">{agent.name}</h3>
          <p className="mt-2 text-sm leading-6 text-muted">{agent.description}</p>
        </div>
        <StatusBadge value={agent.availability} />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {agent.capabilities.map((capability) => <span key={capability} className="rounded-full bg-page px-2.5 py-1 text-xs font-medium text-deep">{capability}</span>)}
      </div>
      {actions ? <div className="mt-4 flex flex-wrap gap-2">{actions}</div> : null}
    </article>
  );
}
