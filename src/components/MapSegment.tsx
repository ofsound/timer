type inputProps = {
  active: boolean;
  inner: number;
  ratio: number;
};

function MapSegment({ active, inner, ratio }: inputProps) {
  return (
    <div
      style={{ width: `${inner * 5}px` }}
      className={`${active && "animate-pulse"} relative block h-10 overflow-hidden rounded-lg border border-black bg-gray-700 text-center font-bold text-black first:hidden even:bg-gray-100`}
    >
      <div
        id="inner"
        style={{ width: active ? (100 * ratio).toString() + "%" : "0px" }}
        className="absolute h-full bg-blue-600 bg-gradient-to-r from-blue-600 to-blue-400"
      ></div>
      <div className="absolute h-full w-full pt-2">{inner}</div>
    </div>
  );
}

export default MapSegment;
