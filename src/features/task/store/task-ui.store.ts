import { create } from "zustand";
import { persist } from "zustand/middleware";

type TaskUiState = {
  selectedTaskId: string | null;
  sidebarCollapsed: boolean;
  revealTask: (taskId: string) => void;
  toggleTask: (taskId: string) => void;
  toggleSidebar: () => void;
};

export const useTaskUiStore = create<TaskUiState>()(
  persist(
    (set) => ({
      selectedTaskId: null,
      sidebarCollapsed: false,
      revealTask: (taskId) =>
        set({ selectedTaskId: taskId, sidebarCollapsed: false }),
      toggleTask: (taskId) =>
        set((state) => ({
          selectedTaskId: state.selectedTaskId === taskId ? null : taskId,
        })),
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
    }),
    {
      name: "task-ui-storage",
      partialize: (state) => ({
        selectedTaskId: state.selectedTaskId,
        sidebarCollapsed: state.sidebarCollapsed,
      }),
    },
  ),
);
