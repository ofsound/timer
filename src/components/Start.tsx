import { useTimerStore } from "../store.ts";

type inputProps = {
  onClick: React.MouseEventHandler<HTMLElement>;
};

function Start({ onClick }: inputProps) {
  const thisStep: number = useTimerStore((state) => state.thisStep);
  const thisRatio: number = useTimerStore((state) => state.thisRatio);
  let thisLabel: string;

  switch (thisStep) {
    case -1:
      thisLabel = "START";
      break;
    case 0:
      thisLabel = Math.ceil(5 - thisRatio * 5).toString();
      break;
    default:
      thisLabel = "PAUSE";
      break;
  }

  // if (!isEnabled) {
  //   thisLabel = "";
  // }

  return (
    <button onClick={onClick} className="relative block h-21 w-21">
      <div
        className={`${thisStep === 0 ? "absolute top-0 h-21 w-21 cursor-pointer rounded-full bg-conic from-black to-green-500" : "absolute top-0 h-21 w-21 cursor-pointer rounded-full bg-green-500"} `}
        style={{ transform: thisStep === 0 ? `rotate(${thisRatio * 360}deg)` : "rotate(0deg)" }}
      ></div>
      <div
        className={`${thisStep === 0 ? "bg-black" : "bg-green-500"} absolute top-0 mt-1.5 ml-1.5 h-18 w-18 rounded-full`}
      ></div>
      <div className="absolute top-7 w-21 text-white">{thisLabel}</div>
    </button>
  );
}

export default Start;
