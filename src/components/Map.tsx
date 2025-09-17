import MapSegment from "./MapSegment.tsx";

import { useTimerStore } from "../store.ts";

type inputProps = {
  isHistoryMap?: boolean;
  historySequence?: number[];
  onClick?: React.MouseEventHandler<HTMLElement>;
};

function Map({ isHistoryMap, onClick, historySequence }: inputProps) {
  const thisStep = useTimerStore((state) => state.thisStep);
  const thisRatio = useTimerStore((state) => state.thisRatio);
  const thisSequence = useTimerStore((state) => state.thisSequence);

  const styles = {
    opacity: thisStep === 0 ? thisRatio * 1 : 1,
  };

  return (
    <div
      onClick={isHistoryMap ? onClick : undefined}
      style={styles}
      className={`${thisStep === 0 && !isHistoryMap && ""} ${isHistoryMap ? "mt-4 flex min-w-0 gap-1 border-none" : "flex h-full w-full max-w-full min-w-0 justify-start gap-2 rounded-lg border border-dashed border-gray-300 p-2"}`}
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
