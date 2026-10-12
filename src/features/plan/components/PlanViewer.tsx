import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import plan from "../../../assets/img/plan.webp";
import type { Task } from "../../../db/task/task.types";
import { useDraftMarkerPlacement } from "../hooks/useDraftMarkerPlacement";
import DraftTaskMarker from "./DraftTaskMarker";
import TaskMarker from "./TaskMarker";
import ZoomControls from "./ZoomControls";

interface PlanViewerProps {
  tasks: Task[];
}

const PlanViewer = ({ tasks }: PlanViewerProps) => {
  const { draftMarker, onPointerDown, onClick } = useDraftMarkerPlacement();

  return (
    <TransformWrapper
      fitOnInit
      minScale={0.5}
      maxScale={8}
      wheel={{
        step: 0.001,
      }}
    >
      <TransformComponent
        wrapperStyle={{
          width: "100%",
          height: "100%",
          touchAction: "none",
        }}
        contentClass="cursor-crosshair"
        contentProps={{ onPointerDown, onClick }}
      >
        <div className="relative w-fit">
          <img src={plan} alt="Floor plan" className="select-none" />
          {tasks.map((task) => (
            <TaskMarker key={task.id} task={task} />
          ))}
          {draftMarker && <DraftTaskMarker marker={draftMarker} />}
        </div>
      </TransformComponent>
      <ZoomControls />
    </TransformWrapper>
  );
};

export default PlanViewer;
