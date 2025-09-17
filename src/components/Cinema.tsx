import { useTimerStore } from "../timerStore.ts";

function Cinema() {
  const thisRatio = useTimerStore((state) => state.thisRatio);
  const thisStep = useTimerStore((state) => state.thisStep);
  const thisSequence = useTimerStore((state) => state.thisSequence);

  const durationSeconds = thisSequence[thisStep];
  const secondsRemaining = Math.ceil(durationSeconds - durationSeconds * thisRatio);

  const styles = {
    width: (thisRatio * 100).toString() + "%",
  };

  return (
    <div className="pointer-events-none relative flex h-full w-full items-center overflow-hidden rounded-lg border-2 border-white bg-black tabular-nums">
      <div className="relative z-2 mx-auto text-center text-4xl font-black text-white">
        {!isNaN(secondsRemaining) && secondsRemaining}
      </div>
      <div style={styles} className="absolute top-0 h-full bg-green-600"></div>
    </div>
  );
}

export default Cinema;
