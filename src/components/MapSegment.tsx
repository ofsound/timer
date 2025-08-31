import { useTimerStore } from "../store.ts";

type inputProps = {
  isActive?: boolean;
  isComplete?: boolean;
  durationSeconds: number;
  isHistoryMapSegment?: boolean;
};

function MapSegment({ isActive, isComplete, durationSeconds, isHistoryMapSegment }: inputProps) {
  const classesOuter = [
    "relative h-full rounded-lg border border-black bg-gray-400 text-center text-black first:hidden even:bg-gray-100",
    isComplete &&
      "border-gray-800 text-gray-800 !opacity-50 bg-[repeating-linear-gradient(45deg,_#e1e1e1_0,_#e1e1e1_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed",
  ]
    .filter(Boolean)
    .join(" ");

  const classesInner = [
    "absolute flex h-full w-full items-center justify-center select-none",
    isHistoryMapSegment && "text-sm font-bold",
    !isHistoryMapSegment && "text-shadow-centered text-[20px] font-black",
  ]
    .filter(Boolean)
    .join(" ");

  const thisRatio: number = useTimerStore((state) => state.thisRatio);
  const widthScaleFactor = isHistoryMapSegment ? 200 : 200;

  return (
    <div style={{ width: `${durationSeconds * widthScaleFactor}px` }} className={classesOuter}>
      <div
        style={{ width: isActive ? (100 * thisRatio).toString() + "%" : "0px" }}
        className={`absolute h-full bg-green-600 bg-gradient-to-r from-green-600 to-green-400`}
      ></div>
      <div className={classesInner}>
        <div>{durationSeconds}</div>
      </div>
    </div>
  );
}

export default MapSegment;
