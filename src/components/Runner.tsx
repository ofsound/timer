import { useRef } from "react";

type inputProps = {
  durationMilliseconds: number;
  progressReport: (a: number) => void;
  runComplete: () => void;
};

function Runner({ durationMilliseconds, progressReport, runComplete }: inputProps) {
  // So, this entire block is running every time anything changes
  console.log("Runner Created ");

  // These are useRef, so they don't get reset when this whole block constantly re-renders
  const animationRequestID = useRef(0);
  const lastTime = useRef(0);

  // still be a use ref, stop if from being creatd over and over?
  const update = useRef(() => {
    const tempElapsed = performance.now() - lastTime.current;

    if (tempElapsed >= durationMilliseconds) {
      cancelAnimationFrame(animationRequestID.current);
      runComplete();
    } else {
      animationRequestID.current = requestAnimationFrame(update.current);
      // setProgressValue(Math.min(tempElapsed / durationMilliseconds, 1));
      progressReport(Math.min(tempElapsed / durationMilliseconds, 1));
    }
  });

  lastTime.current = performance.now();
  update.current();

  return <></>;
}

export default Runner;
