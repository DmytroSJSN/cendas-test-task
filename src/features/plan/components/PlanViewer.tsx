import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import ZoomControls from "./ZoomControls";
import plan from "../../../assets/img/plan.webp";

const PlanViewer = () => {
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
        <img src={plan} alt="Floor plan" />
      </TransformComponent>
      <ZoomControls />
    </TransformWrapper>
  );
};

export default PlanViewer;
