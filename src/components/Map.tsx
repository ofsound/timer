import MapSegment from "./MapSegment.tsx";

type inputProps = {
  sequenceArray: number[];
  thisStep: number;
  thisRatio: number;
  isHistoryMap?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

function Map({ sequenceArray, thisStep, thisRatio, isHistoryMap, onClick }: inputProps) {
  return (
    <div
      onClick={isHistoryMap ? onClick : undefined}
      className={`${isHistoryMap ? "mt-2 flex min-w-0 gap-1 border-none" : "mt-5 flex min-h-15 max-w-full min-w-0 flex-1 justify-start gap-2 rounded-lg border border-dashed border-gray-300 p-2"}`}
    >
      {sequenceArray.map((durationSeconds, index) => (
        <MapSegment
          key={index}
          isActive={thisStep == index ? true : false}
          durationSeconds={durationSeconds}
          progressRatio={thisRatio}
          isHistoryMapSegment={isHistoryMap}
        />
      ))}
    </div>
  );
}

export default Map;
