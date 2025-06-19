import { useRef, useState, useEffect } from "react";

type inputProps = {
  durationMilliseconds: number;
  runComplete: () => void;
};

function Runner({ durationMilliseconds, runComplete }: inputProps) {
  const [progressValue, setProgressValue] = useState(0);

  // These are useRef, so they don't get reset when this whole block constantly re-renders
  const animationRequestID = useRef(0);
  const lastTime = useRef(0);
  const tempElapsed = useRef(0);

  // still be a use ref, stop if from being creatd over and over?
  const update = useRef(() => {
    tempElapsed.current = performance.now() - lastTime.current;

    if (tempElapsed.current >= durationMilliseconds) {
      cancelAnimationFrame(animationRequestID.current);
      console.log("runcomplete");
      runComplete();
    } else {
      animationRequestID.current = requestAnimationFrame(update.current);
      setProgressValue(Math.min(tempElapsed.current / durationMilliseconds, 1));
    }
  });

  useEffect(() => {
    lastTime.current = performance.now();
    update.current();
  }, []);

  return (
    <>
      <div className="mt-1 min-w-20 shrink-0 text-2xl">
        {Number(Math.abs(durationMilliseconds - tempElapsed.current) / 1000).toFixed(1) + "s"}
      </div>

      <progress
        value={progressValue}
        className="mt-2 h-6 w-full [&::-webkit-progress-bar]:bg-black [&::-webkit-progress-value]:bg-green-400"
      ></progress>
    </>
  );
}

export default Runner;
