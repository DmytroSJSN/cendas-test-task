import { MapPin } from "lucide-react";
import { KeepScale } from "react-zoom-pan-pinch";
import type { Marker } from "../../../db/task/task.types";

interface DraftTaskMarkerProps {
  marker: Marker;
}

const DraftTaskMarker = ({ marker }: DraftTaskMarkerProps) => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{
        left: `${marker.x * 100}%`,
        top: `${marker.y * 100}%`,
      }}
    >
      <KeepScale>
        <MapPin className="absolute size-10 -translate-x-1/2 -translate-y-full animate-pulse fill-current text-secondary drop-shadow-md [&>circle]:fill-foreground" />
      </KeepScale>
    </div>
  );
};

export default DraftTaskMarker;
