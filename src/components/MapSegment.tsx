type inputProps = {
  isActive: boolean;
  durationSeconds: number;
  progressRatio: number;
};

function MapSegment({ isActive, durationSeconds, progressRatio }: inputProps) {
  return (
    <div
      style={{ width: `${durationSeconds * 5}px` }}
      className={`${isActive && "animate-pulse"} relative block h-10 overflow-hidden rounded-lg border border-black bg-gray-700 text-center font-bold text-black first:hidden even:bg-gray-100`}
    >
      <div
        style={{ width: isActive ? (100 * progressRatio).toString() + "%" : "0px" }}
        className="absolute h-full bg-blue-600 bg-gradient-to-r from-blue-600 to-blue-400"
      ></div>
      <div className="absolute h-full w-full pt-2 select-none">{durationSeconds}</div>
    </div>
  );
}

export default MapSegment;
