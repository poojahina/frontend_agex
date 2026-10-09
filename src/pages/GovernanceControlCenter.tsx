import { useMemo, useState } from "react";
import { CircleAlert, Filter, RefreshCw, Search, ShieldCheck, UsersRound } from "lucide-react";
import { PageHeader } from "../components/common/PageHeader";
import { MetricCard } from "../components/common/MetricCard";
import { StatusBadge } from "../components/common/StatusBadge";
import { violations } from "../data/mockData";
import { GuardrailViolation } from "../types";

const tabs = ["Violation Logs", "Flagged Users", "Quarantined Workflows"] as const;

export function GovernanceControlCenter() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Violation Logs");
  const [severity, setSeverity] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<GuardrailViolation | null>(null);
  const filtered = useMemo(() => violations.filter((item) => (severity === "All" || item.severity === severity) && `${item.user} ${item.sessionId} ${item.guardrail} ${item.context}`.toLowerCase().includes(query.toLowerCase())), [severity, query]);
  const columns = tab === "Violation Logs" ? ["User", "Session ID", "Triggered guardrail", "Severity", "Context", "Timestamp", "Actions"] : tab === "Flagged Users" ? ["User", "Violation count", "Last activity", "Status", "Actions"] : ["Workflow", "Session ID", "Reason", "Quarantine date", "Status", "Actions"];

  return <div>
    <PageHeader title="Security and governance" description="Review guardrail activity, investigate flagged accounts, and manage quarantined workflows." actions={<button className="btn btn-secondary" type="button"><RefreshCw size={16} aria-hidden="true" />Refresh data</button>} />
    <div className="grid gap-4 md:grid-cols-3">
      <MetricCard label="Guardrail violations" value={violations.length} hint="Across the selected review period" icon={CircleAlert} />
      <MetricCard label="Flagged users" value={2} hint="Require analyst review" icon={UsersRound} />
      <MetricCard label="Quarantined workloads" value={1} hint="Isolated from production execution" icon={ShieldCheck} />
    </div>
    <section className="surface mt-5 overflow-hidden" aria-label="Governance review queue">
      <div className="border-b border-border px-4 py-4 md:px-5"><div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"><div><h2 className="font-bold text-navy">Review queue</h2><p className="mt-1 text-sm text-muted">{filtered.length} records match the current filters.</p></div><div className="flex flex-col gap-2 sm:flex-row"><label className="relative min-w-0 sm:w-72"><Search className="pointer-events-none absolute left-3 top-2.5 text-muted" size={16} aria-hidden="true" /><span className="sr-only">Search governance events</span><input className="input pl-9" placeholder="Search events, users, or sessions" value={query} onChange={(event) => setQuery(event.target.value)} /></label><label className="relative"><Filter className="pointer-events-none absolute left-3 top-2.5 text-muted" size={16} aria-hidden="true" /><span className="sr-only">Filter by severity</span><select className="input pl-9 sm:w-44" value={severity} onChange={(event) => setSeverity(event.target.value)}>{["All", "Low", "Medium", "High", "Critical"].map((item) => <option key={item}>{item}</option>)}</select></label></div></div></div>
      <div className="flex gap-1 overflow-x-auto border-b border-border px-4 md:px-5" role="tablist" aria-label="Governance data">{tabs.map((item) => <button key={item} type="button" role="tab" aria-selected={tab === item} className={`shrink-0 border-b-2 px-3 py-3 text-sm font-semibold transition ${tab === item ? "border-enterprise text-enterprise" : "border-transparent text-muted hover:text-enterprise"}`} onClick={() => setTab(item)}>{item}</button>)}</div>
      <div className="overflow-x-auto"><table className="data-table"><caption className="sr-only">{tab}</caption><thead><tr>{columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead><tbody>{filtered.length ? filtered.map((item) => tab === "Violation Logs" ? <tr key={item.id}><td className="font-medium">{item.user}</td><td className="font-mono text-xs">{item.sessionId}</td><td>{item.guardrail}</td><td><StatusBadge value={item.severity} /></td><td className="max-w-xs"><span className="block truncate" title={item.context}>{item.context}</span></td><td className="whitespace-nowrap text-muted">{item.timestamp}</td><td><button className="btn btn-secondary" type="button" onClick={() => setSelected(item)}>View context</button></td></tr> : tab === "Flagged Users" ? <tr key={item.id}><td className="font-medium">{item.user}</td><td>3</td><td className="whitespace-nowrap text-muted">{item.timestamp}</td><td><StatusBadge value={item.status} /></td><td><button className="btn btn-secondary" type="button" onClick={() => setSelected(item)}>Review</button></td></tr> : <tr key={item.id}><td className="font-medium">{item.workflow}</td><td className="font-mono text-xs">{item.sessionId}</td><td>{item.guardrail}</td><td className="whitespace-nowrap text-muted">{item.timestamp}</td><td><StatusBadge value={item.status} /></td><td><button className="btn btn-secondary" type="button" onClick={() => setSelected(item)}>Inspect</button></td></tr>) : <tr><td className="px-4 py-12 text-center text-muted" colSpan={columns.length}>No governance events match the current filters.</td></tr>}</tbody></table></div>
    </section>
    {selected ? <div className="fixed inset-0 z-50 bg-navy/40 p-4" role="presentation" onClick={() => setSelected(null)}><aside className="ml-auto flex h-full w-full max-w-lg flex-col bg-white shadow-xl" role="dialog" aria-modal="true" aria-labelledby="audit-event-title" onClick={(event) => event.stopPropagation()}><div className="border-b border-border p-6"><h2 id="audit-event-title" className="font-display text-xl font-bold text-navy">Audit event</h2><p className="mt-2 text-sm text-muted">{selected.context}</p></div><pre className="m-6 flex-1 overflow-auto rounded-md bg-page p-4 text-xs text-text">{JSON.stringify(selected, null, 2)}</pre><div className="border-t border-border p-6"><button className="btn btn-primary" type="button" onClick={() => setSelected(null)}>Close</button></div></aside></div> : null}
  </div>;
}
