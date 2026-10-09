import { catalogueAgents, simulations, telemetry, violations, workflows } from "../../data/mockData";
import { Agent, GuardrailViolation, MetricPoint, SimulationTemplate, Workflow } from "../../types";

const delay = (ms = 250) => new Promise((resolve) => window.setTimeout(resolve, ms));

export interface PlatformService {
  listWorkflows(): Promise<Workflow[]>;
  listAgents(): Promise<Agent[]>;
  listSimulations(): Promise<SimulationTemplate[]>;
  listTelemetry(): Promise<MetricPoint[]>;
  listGuardrailViolations(): Promise<GuardrailViolation[]>;
}

export const mockPlatformService: PlatformService = {
  async listWorkflows() {
    await delay();
    return workflows;
  },
  async listAgents() {
    await delay();
    return catalogueAgents;
  },
  async listSimulations() {
    await delay();
    return simulations;
  },
  async listTelemetry() {
    await delay();
    return telemetry;
  },
  async listGuardrailViolations() {
    await delay();
    return violations;
  }
};
