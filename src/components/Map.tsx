import MapSegment from "./MapSegment.tsx";

type inputProps = {
  sequenceArray: number[];
  thisStep: number;
  isHistoryMap?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

function Map({ sequenceArray, thisStep, isHistoryMap, onClick }: inputProps) {
  return (
    <div
      onClick={isHistoryMap ? onClick : undefined}
      className={`${thisStep === 0 && !isHistoryMap && "animate-pulse-fast"} ${isHistoryMap ? "mt-2 flex min-w-0 gap-1 border-none" : "flex h-full w-full max-w-full min-w-0 justify-start gap-2 rounded-lg border border-dashed border-gray-300 p-2"}`}
    >
      {sequenceArray.map((durationSeconds, index) => (
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
