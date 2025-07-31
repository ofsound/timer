type inputProps = {
  isActive: boolean;
  durationSeconds: number;
  progressRatio: number;
  isHistoryMapSegment?: boolean;
};

function MapSegment({ isActive, durationSeconds, progressRatio, isHistoryMapSegment }: inputProps) {
  const widthScaleFactor = isHistoryMapSegment ? 200 : 5;

  return (
    <div
      style={{ width: `${durationSeconds * widthScaleFactor}px` }}
      className={`${isActive && ""} ${isHistoryMapSegment ? "relative h-7 overflow-hidden rounded-lg border border-black bg-gray-400 text-center text-black first:hidden even:bg-gray-100" : "relative h-12 overflow-hidden rounded-lg border border-black bg-gray-400 text-center text-black first:hidden even:bg-gray-100"} `}
    >
      <div
        style={{ width: isActive ? (100 * progressRatio).toString() + "%" : "0px" }}
        className="absolute h-full bg-green-600 bg-gradient-to-r from-green-600 to-green-400"
      ></div>
      <div
        className={`${isHistoryMapSegment ? "absolute h-full w-full pt-1 text-sm font-bold select-none" : "absolute h-full w-full pt-3 font-black select-none"}`}
      >
        {durationSeconds}
      </div>
    </div>
  );
}

export default MapSegment;
