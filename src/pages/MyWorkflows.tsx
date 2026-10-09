import { Plus, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { PageHeader } from "../components/common/PageHeader";
import { WorkflowCard } from "../components/common/Cards";
import { useAppStore } from "../store/useAppStore";

export function MyWorkflows() {
  const workflows = useAppStore((state) => state.workflows);
  const deleteWorkflow = useAppStore((state) => state.deleteWorkflow);
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader title="My Workflows" description="Reopen, run, edit, or remove locally persisted demo workflows." actions={<Link className="btn btn-primary" to="/workflow-builder"><Plus size={16} />Create Workflow</Link>} />
      <div className="grid gap-4 lg:grid-cols-2">
        {workflows.map((workflow) => (
          <div key={workflow.id} className="relative">
            <WorkflowCard workflow={workflow} onRun={() => navigate(`/workflow-execution/${workflow.id}`)} />
            <button className="btn btn-danger absolute bottom-4 right-20 min-h-9 px-3" onClick={() => deleteWorkflow(workflow.id)} aria-label={`Delete ${workflow.name}`}><Trash2 size={15} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
