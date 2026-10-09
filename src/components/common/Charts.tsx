import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { MetricPoint } from "../../types";

const chartColors = {
  blue: "#0070AD",
  darkBlue: "#005A82",
  vibrantBlue: "#12ABDB",
  grey: "#D8E2E7",
  success: "#2F7D32",
  danger: "#C31932"
};

export function TrendChart({ data, dataKey = "executions" }: { data: MetricPoint[]; dataKey?: keyof MetricPoint }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data}>
        <defs><linearGradient id="trend" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={chartColors.vibrantBlue} stopOpacity={0.32}/><stop offset="95%" stopColor={chartColors.vibrantBlue} stopOpacity={0}/></linearGradient></defs>
        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grey} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey={dataKey as string} stroke={chartColors.blue} fill="url(#trend)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function BarMetricChart({ data, dataKey = "cost" }: { data: MetricPoint[]; dataKey?: keyof MetricPoint }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grey} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey={dataKey as string} fill={chartColors.blue} radius={[6, 6, 0, 0]} />
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
          <Cell fill={chartColors.success} /><Cell fill={chartColors.danger} />
        </Pie>
        <Tooltip /><Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
