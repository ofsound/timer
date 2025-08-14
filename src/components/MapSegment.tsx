import { useTimerStore } from "../store.ts";

type inputProps = {
  isActive: boolean;
  isComplete: boolean;
  durationSeconds: number;
  isHistoryMapSegment?: boolean;
};

function MapSegment({ isActive, isComplete, durationSeconds, isHistoryMapSegment }: inputProps) {
  const thisRatio: number = useTimerStore((state) => state.thisRatio);
  const widthScaleFactor = isHistoryMapSegment ? 200 : 200;

  return (
    <div
      style={{ width: `${durationSeconds * widthScaleFactor}px` }}
      className={`${isComplete && "border-gray-800 text-gray-800 !opacity-15"} ${isActive && ""} ${isHistoryMapSegment ? "relative h-full overflow-hidden rounded-lg border border-black bg-gray-400 text-center text-black first:hidden even:bg-gray-100" : "relative h-full overflow-hidden rounded-lg border border-black bg-gray-400 text-center text-black first:hidden even:bg-gray-100"} `}
    >
      <div
        style={{ width: isActive ? (100 * thisRatio).toString() + "%" : "0px" }}
        className={`absolute h-full bg-green-600 bg-gradient-to-r from-green-600 to-green-400`}
      ></div>
      <div
        className={`${isHistoryMapSegment ? "absolute flex h-full w-full items-center justify-center text-sm font-bold select-none" : "text-shadow-centered absolute flex h-full w-full items-center justify-center text-[20px] font-black select-none"}`}
      >
        <div>{durationSeconds}</div>
      </div>
    </div>
  );
}

export default MapSegment;
