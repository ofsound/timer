import MapSegment from "./MapSegment.tsx";

import { useTimerStore } from "../timerStore.ts";

type inputProps = {
  isHistoryMap?: boolean;
  historySequence?: number[];
  onClick?: React.MouseEventHandler<HTMLElement>;
};

function Map({ isHistoryMap, onClick, historySequence }: inputProps) {
  const thisStep = useTimerStore((state) => state.thisStep);
  const thisSequence = useTimerStore((state) => state.thisSequence);

  return (
    <div
      onClick={isHistoryMap ? onClick : undefined}
      className={`${thisStep === 0 && !isHistoryMap && ""} ${isHistoryMap ? "mt-4 flex min-w-0 gap-1 border-none" : "border-gray:800 flex h-full w-full max-w-full min-w-0 justify-start gap-1 rounded-lg border border-dashed p-1 dark:border-gray-300"}`}
    >
      {!isHistoryMap &&
        thisSequence.map((durationSeconds, index) => (
          <MapSegment
            key={index}
            isActive={thisStep == index ? true : false}
            isComplete={thisStep > index ? true : false}
            durationSeconds={durationSeconds}
            isHistoryMapSegment={isHistoryMap}
          />
        ))}

      {isHistoryMap &&
        historySequence?.map((durationSeconds, index) => (
          <MapSegment key={index} durationSeconds={durationSeconds} isHistoryMapSegment={isHistoryMap} />
        ))}
    </div>
  );
}

export default Map;
