import { create } from "zustand";
import { persist } from "zustand/middleware";
import { catalogueAgents, workflows as seedWorkflows } from "../data/mockData";
import { Agent, Workflow } from "../types";

interface AppState {
  workflows: Workflow[];
  customAgents: Agent[];
  sidebarCollapsed: boolean;
  addWorkflow: (workflow: Workflow) => void;
  updateWorkflow: (workflow: Workflow) => void;
  deleteWorkflow: (id: string) => void;
  addAgent: (agent: Agent) => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      workflows: seedWorkflows,
      customAgents: [],
      sidebarCollapsed: false,
      addWorkflow: (workflow) => set((state) => ({ workflows: [workflow, ...state.workflows] })),
      updateWorkflow: (workflow) => set((state) => ({ workflows: state.workflows.map((item) => (item.id === workflow.id ? workflow : item)) })),
      deleteWorkflow: (id) => set((state) => ({ workflows: state.workflows.filter((item) => item.id !== id) })),
      addAgent: (agent) => set((state) => ({ customAgents: [agent, ...state.customAgents] })),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }))
    }),
    {
      name: "amplifier-demo-state",
      partialize: (state) => ({
        workflows: state.workflows,
        customAgents: state.customAgents,
        sidebarCollapsed: state.sidebarCollapsed
      })
    }
  )
);

export const useAllAgents = () => useAppStore((state) => [...state.customAgents, ...catalogueAgents]);
