import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "../components/common/PageHeader";
import { StatusBadge } from "../components/common/StatusBadge";
import { simulations } from "../data/mockData";

export function SimulationLab() {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("All");
  const industries = ["All", "Banking and Financial Services", "Healthcare", "Manufacturing", "Horizontal", "Public Sector", "Real Estate", "Retail", "Luxury"];
  const filtered = useMemo(() => simulations.filter((item) => (industry === "All" || item.industry === industry) && `${item.name} ${item.description} ${item.sessionId}`.toLowerCase().includes(query.toLowerCase())), [query, industry]);
  return <div><PageHeader title="Simulation Lab" description="Select a workflow template below to begin a simulation run." /><div className="surface mb-5 flex flex-col gap-3 p-4 md:flex-row"><input className="input" placeholder="Search by template name, keywords, or session ID" value={query} onChange={(e) => setQuery(e.target.value)} /><select className="input md:w-80" value={industry} onChange={(e) => setIndustry(e.target.value)}>{industries.map((item) => <option key={item}>{item}</option>)}</select></div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((item) => <article key={item.id} className="surface p-5"><div className="flex justify-between gap-3"><span className="text-sm font-semibold text-enterprise">{item.industry}</span><StatusBadge value={item.status} /></div><h2 className="mt-3 font-bold text-navy">{item.name}</h2><p className="mt-2 min-h-16 text-sm leading-6 text-muted">{item.description}</p><p className="mt-3 text-xs font-semibold text-muted">Session ID: {item.sessionId}</p><Link className="btn btn-primary mt-4 w-full" to={`/simulation-lab/${item.id}`}>Open Simulation</Link></article>)}</div></div>;
}
