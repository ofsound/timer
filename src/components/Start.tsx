type inputProps = {
  onClick: React.MouseEventHandler<HTMLElement>;
  thisStep: number;
  thisRatio: number;
};

function Start({ onClick, thisStep, thisRatio }: inputProps) {
  return (
    <button onClick={onClick} className="relative block h-18 w-18">
      <div
        className={`${thisStep === 0 && "animate-pulse"} via-green absolute top-0 h-18 w-18 cursor-pointer rounded-full bg-conic from-black to-green-500`}
        style={{ transform: thisStep === 0 ? `rotate(${thisRatio * 360}deg)` : "rotate(0deg)" }}
      ></div>
      <div className="absolute top-0 mt-1 ml-1 h-16 w-16 rounded-full bg-black"></div>
      <div className="absolute top-3 h-18 w-18 px-3 py-3 text-white">
        {thisStep === 0 ? Math.ceil(5 - thisRatio * 5) : "START"}
      </div>
    </button>
  );
}

export default Start;
