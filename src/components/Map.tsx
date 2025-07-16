import MapSegment from "./MapSegment.tsx";

type inputProps = {
  sequenceArray: number[];
  thisStep: number;
  thisRatio: number;
  historyMap?: boolean;
};

function Map({ sequenceArray, thisStep, thisRatio, historyMap }: inputProps) {
  return (
    <div
      id="map"
      className={`${historyMap && "border-none"} mt-6 flex justify-start gap-2 rounded-lg border-dashed border-gray-300 p-2 has-[div]:border`}
    >
      {sequenceArray.map((inner, index) => (
        <MapSegment key={index} active={thisStep == index ? true : false} inner={inner} ratio={thisRatio} />
      ))}
    </div>
  );
}

export default Map;
