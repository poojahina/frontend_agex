import { Status, Severity } from "../../types";
import { cn } from "../../utils/cn";

const tones: Record<string, string> = {
  Active: "bg-blue-50 text-enterprise border-blue-100",
  Published: "bg-cyan-50 text-deep border-cyan-100",
  Draft: "bg-slate-50 text-muted border-slate-200",
  Completed: "bg-emerald-50 text-success border-emerald-100",
  Failed: "bg-red-50 text-danger border-red-100",
  Running: "bg-blue-50 text-electric border-blue-100",
  Waiting: "bg-amber-50 text-warning border-amber-100",
  "Human Input Required": "bg-amber-50 text-warning border-amber-100",
  Low: "bg-slate-50 text-muted border-slate-200",
  Medium: "bg-amber-50 text-warning border-amber-100",
  High: "bg-orange-50 text-orange-700 border-orange-100",
  Critical: "bg-red-50 text-danger border-red-100"
};

export function StatusBadge({ value }: { value: Status | Severity | string }) {
  return <span className={cn("inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold", tones[value] ?? tones.Draft)}>{value}</span>;
}
