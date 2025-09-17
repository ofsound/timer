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
    <div className="pointer-events-none absolute -ml-5 hidden h-full w-full border-1 border-green-600 pt-40!">
      <div className="absolute right-0 left-0 mx-auto pt-30 text-center text-4xl text-white">{secondsRemaining}</div>
      <div style={styles} className="h-full bg-green-600"></div>
    </div>
  );
}

export default Cinema;
