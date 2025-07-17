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
      className={`${isHistoryMap ? "mt-4 flex min-w-0 gap-1 border-none" : "mt-6 flex justify-start gap-2 rounded-lg border-dashed border-gray-300 p-2 has-[div]:border"}`}
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
