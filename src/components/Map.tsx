import MapSegment from "./MapSegment.tsx";

import { useTimerStore } from "../store.ts";

type inputProps = {
  isHistoryMap?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

function Map({ isHistoryMap, onClick }: inputProps) {
  const thisStep = useTimerStore((state) => state.thisStep);
  const thisSequence = useTimerStore((state) => state.thisSequence);

  return (
    <div
      onClick={isHistoryMap ? onClick : undefined}
      className={`${thisStep === 0 && !isHistoryMap && "animate-pulse-fast"} ${isHistoryMap ? "mt-2 flex min-w-0 gap-1 border-none" : "flex h-full w-full max-w-full min-w-0 justify-start gap-2 rounded-lg border border-dashed border-gray-300 p-2"}`}
    >
      {thisSequence.map((durationSeconds, index) => (
        <MapSegment
          key={index}
          isActive={thisStep == index ? true : false}
          isComplete={thisStep > index ? true : false}
          durationSeconds={durationSeconds}
          isHistoryMapSegment={isHistoryMap}
        />
      ))}
    </div>
  );
}

export default Map;
