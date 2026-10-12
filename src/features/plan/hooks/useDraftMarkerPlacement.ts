import { useRef } from "react";
import type { MouseEvent, PointerEvent } from "react";
import {
  MARKER_COORDINATE_MAX,
  MARKER_COORDINATE_MIN,
} from "../../../db/task/task.constants";
import { useTaskUiStore } from "../../task/store/task-ui.store";

const DRAG_THRESHOLD_PX = 5;

const clampCoordinate = (value: number) =>
  Math.min(MARKER_COORDINATE_MAX, Math.max(MARKER_COORDINATE_MIN, value));

export function useDraftMarkerPlacement() {
  const draftMarker = useTaskUiStore((state) => state.draftMarker);
  const setDraftMarker = useTaskUiStore((state) => state.setDraftMarker);
  const pointerDownRef = useRef<{ x: number; y: number } | null>(null);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerDownRef.current = { x: event.clientX, y: event.clientY };
  };

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    const startedAt = pointerDownRef.current;
    pointerDownRef.current = null;

    if (
      startedAt &&
      Math.hypot(event.clientX - startedAt.x, event.clientY - startedAt.y) >
        DRAG_THRESHOLD_PX
    ) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    setDraftMarker({
      x: clampCoordinate((event.clientX - rect.left) / rect.width),
      y: clampCoordinate((event.clientY - rect.top) / rect.height),
    });
  };

  return { draftMarker, onPointerDown, onClick };
}
