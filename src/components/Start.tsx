import { useTimerStore } from "../store.ts";

type inputProps = {
  onClick: React.MouseEventHandler<HTMLElement>;
};

function Start({ onClick }: inputProps) {
  const thisStep: number = useTimerStore((state) => state.thisStep);
  const thisRatio: number = useTimerStore((state) => state.thisRatio);
  const startIsEnabled: boolean = useTimerStore((state) => state.startIsEnabled);
  const runningIsPaused = useTimerStore((state) => state.runningIsPaused);
  const countInTime = useTimerStore((state) => state.countInTime);

  let thisLabel: string;

  switch (thisStep) {
    case -1:
      thisLabel = "START";
      break;
    case 0:
      thisLabel = Math.ceil(countInTime - thisRatio * countInTime).toString();
      break;
    default:
      thisLabel = "PAUSE";
      break;
  }

  if (runningIsPaused) {
    thisLabel = "RESUME";
  }

  return (
    <button
      onClick={onClick}
      className={`relative block h-22 w-22 ${!startIsEnabled && "pointer-events-none opacity-0"}`}
    >
      <div
        className={`absolute top-0 h-22 w-22 cursor-pointer rounded-full ${thisStep === 0 ? "bg-conic from-black to-green-500" : "bg-green-500"} `}
        style={{ transform: thisStep === 0 ? `rotate(${thisRatio * 360}deg)` : "rotate(0deg)" }}
      ></div>
      <div
        className={`${thisStep === 0 ? "bg-black" : "bg-green-500"} absolute top-0 mt-1.5 ml-1.5 h-19 w-19 rounded-full`}
      ></div>
      <div className="absolute top-[34px] w-22 text-sm font-bold tracking-wider text-white text-shadow-sm">
        {thisLabel}
      </div>
    </button>
  );
}

export default Start;
