import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "../components/common/PageHeader";
import { AgentCard } from "../components/common/Cards";
import { catalogueAgents } from "../data/mockData";
import { useAppStore } from "../store/useAppStore";
import { Agent } from "../types";

export function AgentCatalogue() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<Agent | null>(null);
  const customAgents = useAppStore((state) => state.customAgents);
  const addAgent = useAppStore((state) => state.addAgent);
  const agents = [...customAgents, ...catalogueAgents];
  const categories = ["All", "Planning", "Data Integration", "Research", "Analysis", "Development", "Compliance", "Communication", "Monitoring"];
  const filtered = useMemo(() => agents.filter((agent) => (category === "All" || agent.category === category) && `${agent.name} ${agent.description}`.toLowerCase().includes(query.toLowerCase())), [agents, category, query]);
  const createCustom = () => addAgent({ id: `custom-${Date.now()}`, name: "Custom Enterprise Agent", description: "Locally persisted demo agent ready for workflow configuration.", category: "Planning", capabilities: ["Custom instructions"], inputs: ["User-defined schema"], outputs: ["User-defined output"], availability: "Available", humanInputRequired: true });
  return (
    <div>
      <PageHeader title="Agent Catalogue" description="Search, inspect, configure, and extend the available agent inventory." actions={<button className="btn btn-primary" onClick={createCustom}><Plus size={16} />Create Custom Agent</button>} />
      <div className="surface mb-5 flex flex-col gap-3 p-4 md:flex-row">
        <input className="input" placeholder="Search agents, capabilities, or categories" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select className="input md:w-64" value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((agent) => <AgentCard key={agent.id} agent={agent} actions={<><button className="btn btn-secondary" onClick={() => setSelected(agent)}>View Details</button><button className="btn btn-primary">Add to Workflow</button><button className="btn btn-secondary">Configure</button></>} />)}
      </div>
      {selected ? <div className="fixed inset-0 z-50 bg-navy/40" onClick={() => setSelected(null)}><aside className="ml-auto h-full w-full max-w-lg overflow-auto bg-white p-6 shadow-enterprise" onClick={(e) => e.stopPropagation()}><PageHeader title={selected.name} description={selected.description} /><Info label="Category" value={selected.category} /><Info label="Supported Inputs" value={selected.inputs.join(", ")} /><Info label="Expected Outputs" value={selected.outputs.join(", ")} /><Info label="Capabilities" value={selected.capabilities.join(", ")} /><Info label="Human Approval Requirement" value={selected.humanInputRequired ? "Required for sensitive steps" : "Not required by default"} /><button className="btn btn-primary mt-4" onClick={() => setSelected(null)}>Close</button></aside></div> : null}
    </div>
  );
}
function Info({ label, value }: { label: string; value: string }) { return <div className="border-b border-border py-4"><b className="text-sm text-navy">{label}</b><p className="mt-1 text-sm text-muted">{value}</p></div>; }
