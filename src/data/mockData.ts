import { Agent, ExecutionEvent, GuardrailViolation, MetricPoint, SimulationTemplate, Workflow } from "../types";

export const recommendedAgents: Agent[] = [
  { id: "a1", name: "Requirements and Architecture Planner", description: "Clarifies requirements and creates the implementation architecture.", category: "Planning", capabilities: ["Requirement synthesis", "Architecture planning"], inputs: ["Business goals", "Constraints"], outputs: ["Architecture summary", "Scope"], availability: "Available", humanInputRequired: false },
  { id: "a2", name: "Cloud Data Integration Designer", description: "Designs data ingestion and integration across AWS, Azure, and Google Cloud.", category: "Data Integration", capabilities: ["Cloud mapping", "Pipeline design"], inputs: ["Source systems"], outputs: ["Integration design"], availability: "Available" },
  { id: "a3", name: "Dashboard UX and Feature Designer", description: "Creates dashboard layouts, KPIs, and interaction requirements.", category: "Development", capabilities: ["UX design", "KPI modeling"], inputs: ["User groups", "Metrics"], outputs: ["Dashboard blueprint"], availability: "Available" },
  { id: "a4", name: "Training and Adoption Strategist", description: "Prepares training, documentation, and adoption recommendations.", category: "Communication", capabilities: ["Enablement", "Documentation"], inputs: ["Audience"], outputs: ["Adoption plan"], availability: "Available", humanInputRequired: true },
  { id: "a5", name: "Ethical and Compliance Agent", description: "Reviews security, compliance, privacy, and ethical risks.", category: "Compliance", capabilities: ["Policy review", "Risk scoring"], inputs: ["Architecture"], outputs: ["Compliance notes"], availability: "Available", humanInputRequired: true },
  { id: "a6", name: "Communicator", description: "Formats and consolidates the final report.", category: "Communication", capabilities: ["Summarization", "Report formatting"], inputs: ["Agent outputs"], outputs: ["Executive report"], availability: "Available" }
];

export const catalogueAgents: Agent[] = [
  ...recommendedAgents,
  { id: "a7", name: "Market Research Analyst", description: "Scans competitive and market signals for business planning.", category: "Research", capabilities: ["Research briefs", "Source triage"], inputs: ["Topic"], outputs: ["Research summary"], availability: "Beta" },
  { id: "a8", name: "Model Performance Monitor", description: "Tracks latency, reliability, and quality indicators.", category: "Monitoring", capabilities: ["Telemetry", "Alerting"], inputs: ["Execution logs"], outputs: ["Health report"], availability: "Available" },
  { id: "a9", name: "Code Generation Assistant", description: "Creates implementation tasks and starter code plans.", category: "Development", capabilities: ["Task breakdown", "Code planning"], inputs: ["Architecture"], outputs: ["Implementation plan"], availability: "Restricted" }
];

export const workflows: Workflow[] = [
  { id: "w1", name: "Unified Dashboard Deployment Process", description: "Design and deploy a unified dashboard integrating AWS, Azure, and Google Cloud data for weekly progress monitoring.", domain: "Business Intelligence", industry: "Horizontal", status: "Active", agents: recommendedAgents, lastExecution: "Today, 10:20", executions: 86, successRate: 94 },
  { id: "w2", name: "Smart Loan Origination", description: "Coordinates KYC, eligibility, document validation, and risk review for lending decisions.", domain: "Lending", industry: "Banking and Financial Services", status: "Published", agents: recommendedAgents.slice(0, 5), lastExecution: "Yesterday, 16:45", executions: 132, successRate: 91 },
  { id: "w3", name: "Retail Demand Signal Monitor", description: "Combines sales, inventory, and promotion signals to recommend replenishment actions.", domain: "Supply Chain", industry: "Retail", status: "Draft", agents: [catalogueAgents[0], catalogueAgents[1], catalogueAgents[7]], lastExecution: "3 days ago", executions: 24, successRate: 88 }
];

export const executionEvents: ExecutionEvent[] = recommendedAgents.map((agent, index) => ({
  id: `e${index + 1}`,
  agentId: agent.id,
  agentName: agent.name,
  status: index < 2 ? "Completed" : index === 2 ? "Running" : index === 4 ? "Human Input Required" : "Waiting",
  summary: `${agent.name} prepared a user-facing execution summary for the current workflow stage.`,
  input: "Workflow scope, selected requirements, and prior agent outputs.",
  output: index < 3 ? "Structured design artifact generated for review." : "Pending execution.",
  duration: index < 3 ? `${28 + index * 11}s` : "--",
  timestamp: `10:${20 + index * 3}`
}));

export const simulations: SimulationTemplate[] = [
  { id: "s1", industry: "Banking and Financial Services", name: "Smart Loan Origination", description: "Simulates a loan application journey from KYC to final recommendation.", sessionId: "SIM-LOAN-2481", status: "Waiting", agents: [
    "KYC Verifier", "Eligibility Assessor", "Document Validator", "Loan Calculator", "Risk Assessment Agent", "Loan Decision Agent"
  ].map((name, i) => ({ id: `loan-${i}`, name, description: `${name} evaluates the applicant package and returns a structured result.`, category: "Analysis", capabilities: ["Assessment"], inputs: ["Application data"], outputs: ["Decision artifact"], availability: "Available" as const })) },
  { id: "s2", industry: "Banking and Financial Services", name: "Intelligent Fraud Detector", description: "Scores transactions and escalates high-risk activity.", sessionId: "SIM-FRAUD-9164", status: "Completed", agents: recommendedAgents.slice(0, 4) },
  { id: "s3", industry: "Healthcare", name: "Clinical Documentation Assistants", description: "Summarizes clinical notes and routes documentation tasks.", sessionId: "SIM-CLIN-3342", status: "Draft", agents: recommendedAgents.slice(0, 3) },
  { id: "s4", industry: "Manufacturing", name: "Predictive Maintenance", description: "Analyzes equipment signals and recommends maintenance windows.", sessionId: "SIM-MFG-7741", status: "Waiting", agents: recommendedAgents.slice(1, 5) },
  { id: "s5", industry: "Public Sector", name: "Permit Review Accelerator", description: "Coordinates document checks, eligibility review, and citizen communication.", sessionId: "SIM-PUB-1402", status: "Waiting", agents: recommendedAgents.slice(0, 5) },
  { id: "s6", industry: "Luxury", name: "Clienteling Recommendation Engine", description: "Generates high-touch customer engagement plans.", sessionId: "SIM-LUX-8017", status: "Waiting", agents: recommendedAgents.slice(2, 6) }
];

export const telemetry: MetricPoint[] = [
  { name: "Mon", executions: 120, success: 112, failed: 8, latency: 890, tokens: 124000, cost: 82 },
  { name: "Tue", executions: 142, success: 133, failed: 9, latency: 830, tokens: 151000, cost: 97 },
  { name: "Wed", executions: 168, success: 156, failed: 12, latency: 910, tokens: 173000, cost: 111 },
  { name: "Thu", executions: 151, success: 146, failed: 5, latency: 780, tokens: 166000, cost: 104 },
  { name: "Fri", executions: 189, success: 178, failed: 11, latency: 860, tokens: 198000, cost: 128 }
];

export const violations: GuardrailViolation[] = [
  { id: "g1", user: "analyst.user", sessionId: "SES-2049", guardrail: "Restricted data request", severity: "High", context: "Attempted to include sensitive payroll fields in a dashboard export.", timestamp: "2026-10-09 10:14", workflow: "Unified Dashboard Deployment Process", status: "In Review" },
  { id: "g2", user: "ops.lead", sessionId: "SES-1872", guardrail: "Unapproved connector", severity: "Medium", context: "Requested a connector that has not been approved by integration governance.", timestamp: "2026-10-08 17:22", workflow: "Retail Demand Signal Monitor", status: "Open" },
  { id: "g3", user: "loan.reviewer", sessionId: "SES-1440", guardrail: "Model decision explainability", severity: "Critical", context: "Loan recommendation required additional rationale before publishing.", timestamp: "2026-10-08 11:05", workflow: "Smart Loan Origination", status: "Resolved" },
  { id: "g4", user: "project.owner", sessionId: "SES-1221", guardrail: "PII minimization", severity: "Low", context: "Prompt included unnecessary contact details in a mock report.", timestamp: "2026-10-07 09:42", workflow: "Unified Dashboard Deployment Process", status: "Resolved" }
];
