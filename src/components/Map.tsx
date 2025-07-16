import MapSegment from "./MapSegment.tsx";

type inputProps = {
  sequenceArray: number[];
  thisStep: number;
  thisRatio: number;
  isHistoryMap?: boolean;
};

function Map({ sequenceArray, thisStep, thisRatio, isHistoryMap }: inputProps) {
  return (
    <div
      className={`${isHistoryMap && "border-none"} mt-6 flex justify-start gap-2 rounded-lg border-dashed border-gray-300 p-2 has-[div]:border`}
    >
      {sequenceArray.map((durationSeconds, index) => (
        <MapSegment
          key={index}
          isActive={thisStep == index ? true : false}
          durationSeconds={durationSeconds}
          progressRatio={thisRatio}
        />
      ))}
    </div>
  );
}

export default Map;
