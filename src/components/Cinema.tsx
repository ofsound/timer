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

  function convertSecondsToMinutesSeconds(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = String(minutes);
    const formattedSeconds = String(seconds).padStart(2, "0");

    if (minutes > 0) {
      return `${formattedMinutes}:${formattedSeconds}`;
    } else {
      if (seconds === 0) {
        return "";
      } else {
        return seconds;
      }
    }
  }

  return (
    <div className="pointer-events-none relative flex h-full w-full items-center overflow-hidden rounded-lg border-1 border-gray-200 py-14 tabular-nums">
      <div style={stylesIntro} className="absolute top-0 h-full w-full bg-gray-400/50 dark:bg-black"></div>
      <div className="relative z-2 mx-auto text-center text-6xl font-black text-black dark:text-white">
        {!isNaN(secondsRemaining) && convertSecondsToMinutesSeconds(secondsRemaining)}
      </div>
      <div
        style={styles}
        className={`${thisStep === 0 ? "hidden" : "block"} absolute top-0 h-full w-full origin-left bg-green-600`}
      ></div>
    </div>
  );
}

export default Cinema;
