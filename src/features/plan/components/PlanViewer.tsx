import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import type { Task } from "../../../db/task/task.types";
import plan from "../../../assets/img/plan.webp";
import TaskMarker from "./TaskMarker";
import ZoomControls from "./ZoomControls";

interface PlanViewerProps {
  tasks: Task[];
}

const PlanViewer = ({ tasks }: PlanViewerProps) => {
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
      >
        <div className="relative w-fit">
          <img src={plan} alt="Floor plan" className="block" />
          {tasks.map((task) => (
            <TaskMarker key={task.id} task={task} />
          ))}
        </div>
      </TransformComponent>
      <ZoomControls />
    </TransformWrapper>
  );
};

export default PlanViewer;
