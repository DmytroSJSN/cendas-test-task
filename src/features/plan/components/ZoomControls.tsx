import { useControls } from "react-zoom-pan-pinch";
import Button from "../../../components/ui/Button";

const ZoomControls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="absolute right-4 bottom-4 flex flex-col items-center gap-1 rounded-lg border border-border bg-card/90 p-1 backdrop-blur">
      <Button
        variant="secondary"
        className="size-9 p-0 text-base"
        onClick={() => zoomIn(0.2)}
        aria-label="Zoom In"
      >
        +
      </Button>
      <Button
        variant="secondary"
        className="size-9 p-0 text-base"
        onClick={() => zoomOut(0.2)}
        aria-label="Zoom Out"
      >
        −
      </Button>
      <Button
        variant="secondary"
        className="h-8 px-2 text-xs"
        onClick={() => resetTransform()}
        aria-label="Reset Zoom"
      >
        Reset
      </Button>
    </div>
  );
};

export default ZoomControls;
