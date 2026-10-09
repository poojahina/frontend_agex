export type Status = "Draft" | "Active" | "Published" | "Completed" | "Failed" | "Running" | "Waiting" | "Human Input Required";
export type Severity = "Low" | "Medium" | "High" | "Critical";

export interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  capabilities: string[];
  inputs: string[];
  outputs: string[];
  availability: "Available" | "Beta" | "Restricted";
  humanInputRequired?: boolean;
  instructions?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  domain: string;
  industry: string;
  status: Status;
  agents: Agent[];
  lastExecution: string;
  executions: number;
  successRate: number;
}

export interface ExecutionEvent {
  id: string;
  agentId: string;
  agentName: string;
  status: Status;
  summary: string;
  input: string;
  output: string;
  duration: string;
  timestamp: string;
}

export interface SimulationTemplate {
  id: string;
  industry: string;
  name: string;
  description: string;
  sessionId: string;
  status: Status;
  agents: Agent[];
}

export interface GuardrailViolation {
  id: string;
  user: string;
  sessionId: string;
  guardrail: string;
  severity: Severity;
  context: string;
  timestamp: string;
  workflow: string;
  status: "Open" | "In Review" | "Resolved";
}

export interface MetricPoint {
  name: string;
  executions?: number;
  success?: number;
  failed?: number;
  latency?: number;
  tokens?: number;
  cost?: number;
}
