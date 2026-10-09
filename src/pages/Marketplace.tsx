import { useMemo, useState } from "react";
import { PageHeader } from "../components/common/PageHeader";
import { StatusBadge } from "../components/common/StatusBadge";

const templates = [
  ["Featured AI Solutions", "Enterprise dashboard delivery accelerator", "Workflow"],
  ["Agent Templates", "Compliance review squad", "Agent"],
  ["Workflow Templates", "Cloud migration assessment", "Workflow"],
  ["Industry Accelerators", "Smart loan origination pack", "Banking"],
  ["Integration Connectors", "Microsoft Foundry connector blueprint", "Connector"],
  ["Industry Accelerators", "Predictive maintenance kit", "Manufacturing"]
];

export function Marketplace() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const filtered = useMemo(() => templates.filter(([group, name, type]) => (category === "All" || group === category) && `${group} ${name} ${type}`.toLowerCase().includes(query.toLowerCase())), [query, category]);
  return <div><PageHeader title="AI Marketplace" description="A proposed marketplace design for reusable enterprise AI assets and accelerators." /><div className="surface mb-5 flex flex-col gap-3 p-4 md:flex-row"><input className="input" placeholder="Search templates and accelerators" value={query} onChange={(e) => setQuery(e.target.value)} /><select className="input md:w-72" value={category} onChange={(e) => setCategory(e.target.value)}>{["All", ...Array.from(new Set(templates.map((t) => t[0])))].map((item) => <option key={item}>{item}</option>)}</select></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map(([group, name, type]) => <article key={name} className="surface p-5"><div className="flex justify-between gap-3"><span className="text-sm font-semibold text-enterprise">{group}</span><StatusBadge value={type} /></div><h2 className="mt-3 font-bold text-navy">{name}</h2><p className="mt-2 min-h-16 text-sm leading-6 text-muted">Reusable demo asset with configuration guidance, dependencies, governance notes, and preview workflow steps.</p><div className="mt-4 flex gap-2"><button className="btn btn-secondary">View Details</button><button className="btn btn-primary">Use Template</button></div></article>)}</div></div>;
}
