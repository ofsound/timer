import MapSegment from "./MapSegment.tsx";

import { useTimerStore } from "../timerStore.ts";

type inputProps = {
  isHistoryMap?: boolean;
  isAlternatingMap?: boolean;
  historySequence?: number[];
  onClick?: React.MouseEventHandler<HTMLElement>;
};

function Map({ isHistoryMap, isAlternatingMap, onClick, historySequence }: inputProps) {
  const thisStep = useTimerStore((state) => state.thisStep);
  const thisSequence = useTimerStore((state) => state.thisSequence);

  const isAlternating = useTimerStore((state) => state.isAlternating);
  const setIsAlternating = useTimerStore((state) => state.setIsAlternating);

  // maybe the alternating map switch is actually in updating the zustand?

  const onMiniMapClick = () => {
    console.log("lock!");

    setIsAlternating(!isAlternating);
  };

  return (
    <div
      onClick={isHistoryMap ? onClick : onMiniMapClick}
      className={`${thisStep === 0 && !isHistoryMap && ""} ${isHistoryMap ? "flex min-w-0 gap-1 border-none" : "border-gray:800 flex w-full max-w-full min-w-0 justify-start gap-1 rounded-lg border border-dashed p-1 dark:border-gray-300"}`}
    >
      {!isHistoryMap &&
        thisSequence.map((durationSeconds, index) => (
          <MapSegment
            key={index}
            isActive={thisStep == index ? true : false}
            isComplete={thisStep > index ? true : false}
            durationSeconds={durationSeconds}
            isHistoryMapSegment={isHistoryMap}
            isAlternatingMapSegment={isAlternating}
          />
        ))}

      {isHistoryMap &&
        historySequence?.map((durationSeconds, index) => (
          <MapSegment
            key={index}
            durationSeconds={durationSeconds}
            isHistoryMapSegment={isHistoryMap}
            isAlternatingMapSegment={isAlternatingMap}
          />
        ))}
    </div>
  );
}

export default Map;
