import { useTimerStore } from "../timerStore.ts";

function Cinema() {
  const thisRatio = useTimerStore((state) => state.thisRatio);
  const thisStep = useTimerStore((state) => state.thisStep);
  const thisSequence = useTimerStore((state) => state.thisSequence);

  const durationSeconds = thisSequence[thisStep];
  const secondsRemaining = Math.ceil(durationSeconds - durationSeconds * thisRatio);

  const styles = {
    transform: "scaleX(" + thisRatio + ")",
  };

  const stylesIntro = {
    opacity: thisStep === 0 ? thisRatio * 1 : 1,
  };

  return (
    <div
      style={stylesIntro}
      className="pointer-events-none relative flex h-full w-full items-center overflow-hidden rounded-lg border-1 border-gray-200 bg-black py-14 tabular-nums"
    >
      <div className="relative z-2 mx-auto text-center text-6xl font-black text-white">
        {!isNaN(secondsRemaining) && secondsRemaining}
      </div>
      <div
        style={styles}
        className={`${thisStep === 0 ? "hidden" : "block"} absolute top-0 h-full w-full origin-left bg-green-600`}
      ></div>
    </div>
  );
}

export default Cinema;
