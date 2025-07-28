type inputProps = {
  onClick: React.MouseEventHandler<HTMLElement>;
  thisStep: number;
  thisRatio: number;
};

function Start({ onClick, thisStep, thisRatio }: inputProps) {
  return (
    <button
      onClick={onClick}
      className={`${thisStep === 0 && "animate-pulse"} block h-18 w-18 cursor-pointer rounded-full bg-green-800 px-3 py-3 text-white`}
      style={{ transform: thisStep === 0 ? `rotate(${thisRatio * 360}deg)` : "rotate(0deg)" }}
    >
      Start
    </button>
  );
}

export default Start;
