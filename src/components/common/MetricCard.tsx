import { LucideIcon } from "lucide-react";

export function MetricCard({ label, value, hint, icon: Icon }: { label: string; value: string | number; hint?: string; icon?: LucideIcon }) {
  return (
    <div className="surface min-h-28 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
          <p className="mt-2 text-2xl font-bold tabular-nums text-navy">{value}</p>
        </div>
        {Icon ? <span className="rounded-md bg-blue-50 p-2 text-enterprise"><Icon size={19} /></span> : null}
      </div>
      {hint ? <p className="mt-3 text-xs text-muted">{hint}</p> : null}
    </div>
  );
}
