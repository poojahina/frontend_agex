import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { MetricPoint } from "../../types";

export function TrendChart({ data, dataKey = "executions" }: { data: MetricPoint[]; dataKey?: keyof MetricPoint }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data}>
        <defs><linearGradient id="trend" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#2588D8" stopOpacity={0.35}/><stop offset="95%" stopColor="#2588D8" stopOpacity={0}/></linearGradient></defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#E1E8F0" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey={dataKey as string} stroke="#1769AA" fill="url(#trend)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function BarMetricChart({ data, dataKey = "cost" }: { data: MetricPoint[]; dataKey?: keyof MetricPoint }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E1E8F0" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey={dataKey as string} fill="#1769AA" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SuccessPie({ success, failed }: { success: number; failed: number }) {
  const data = [{ name: "Success", value: success }, { name: "Failed", value: failed }];
  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie data={data} innerRadius={58} outerRadius={86} paddingAngle={4} dataKey="value">
          <Cell fill="#16865D" /><Cell fill="#D34B55" />
        </Pie>
        <Tooltip /><Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
