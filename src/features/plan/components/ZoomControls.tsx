import { Maximize, ZoomIn, ZoomOut } from "lucide-react";
import { useControls } from "react-zoom-pan-pinch";
import Button from "../../../components/ui/Button";

const ZOOM_STEP = 0.2;

const ZoomControls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="absolute right-4 bottom-4 flex flex-col items-center gap-1 rounded-lg border border-border bg-card/80 p-1 backdrop-blur">
      <Button
        variant="secondary"
        className="size-9 p-0"
        onClick={() => zoomIn(ZOOM_STEP)}
        aria-label="Zoom In"
      >
        <ZoomIn className="size-4" />
      </Button>
      <Button
        variant="secondary"
        className="size-9 p-0"
        onClick={() => zoomOut(ZOOM_STEP)}
        aria-label="Zoom Out"
      >
        <ZoomOut className="size-4" />
      </Button>
      <Button
        variant="secondary"
        className="size-9 p-0"
        onClick={() => resetTransform()}
        aria-label="Reset Zoom"
      >
        <Maximize className="size-4" />
      </Button>
    </div>
  );
};

export default ZoomControls;
