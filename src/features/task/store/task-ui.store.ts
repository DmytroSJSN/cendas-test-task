import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Marker } from "../../../db/task/task.types";

type TaskUiState = {
  selectedTaskId: string | null;
  sidebarCollapsed: boolean;
  draftMarker: Marker | null;
  revealTask: (taskId: string) => void;
  toggleTask: (taskId: string) => void;
  toggleSidebar: () => void;
  setDraftMarker: (marker: Marker) => void;
  clearDraftMarker: () => void;
};

export const useTaskUiStore = create<TaskUiState>()(
  persist(
    (set) => ({
      selectedTaskId: null,
      sidebarCollapsed: false,
      draftMarker: null,
      revealTask: (taskId) =>
        set({ selectedTaskId: taskId, sidebarCollapsed: false }),
      toggleTask: (taskId) =>
        set((state) => ({
          selectedTaskId: state.selectedTaskId === taskId ? null : taskId,
        })),
      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setDraftMarker: (marker) =>
        set({
          draftMarker: marker,
          sidebarCollapsed: false,
          selectedTaskId: null,
        }),
      clearDraftMarker: () => set({ draftMarker: null }),
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
