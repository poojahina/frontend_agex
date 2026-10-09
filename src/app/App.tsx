import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "../components/layout/AppShell";
import { Home } from "../pages/Home";
import { WorkflowBuilder } from "../pages/WorkflowBuilder";
import { MyWorkflows } from "../pages/MyWorkflows";
import { AgentCatalogue } from "../pages/AgentCatalogue";
import { Marketplace } from "../pages/Marketplace";
import { SimulationLab } from "../pages/SimulationLab";
import { SimulationDetail } from "../pages/SimulationDetail";
import { DashboardInsights } from "../pages/DashboardInsights";
import { Observability } from "../pages/Observability";
import { CostUtilisation } from "../pages/CostUtilisation";
import { Governance } from "../pages/Governance";
import { WorkflowExecution } from "../pages/WorkflowExecution";
import { Chat } from "../pages/Chat";
import { Settings } from "../pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Home />} />
        <Route path="/workflow-builder" element={<WorkflowBuilder />} />
        <Route path="/workflow-execution/:id" element={<WorkflowExecution />} />
        <Route path="/my-workflows" element={<MyWorkflows />} />
        <Route path="/agents" element={<AgentCatalogue />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/simulation-lab" element={<SimulationLab />} />
        <Route path="/simulation-lab/:id" element={<SimulationDetail />} />
        <Route path="/dashboard-insights" element={<DashboardInsights />} />
        <Route path="/observability" element={<Observability />} />
        <Route path="/cost-utilisation" element={<CostUtilisation />} />
        <Route path="/governance" element={<Governance />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
