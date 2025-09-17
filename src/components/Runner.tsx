import { useRef, useEffect } from "react";

import { useTimerStore } from "../timerStore.ts";

type inputProps = {
  durationMilliseconds: number;
  isRunning: (a: number) => void;
  runComplete: () => void;
};

function Runner({ durationMilliseconds, runComplete, isRunning }: inputProps) {
  const runningIsPaused = useTimerStore((state) => state.runningIsPaused);

  const runStarted = useRef(false);
  const animationRequestID = useRef(0);
  const lastTime = useRef(performance.now());

  const elapsedAtPause = useRef(0);

  const tempElapsed = useRef(0);

  const animationLoop = useRef(() => {
    tempElapsed.current = performance.now() - lastTime.current;

    if (tempElapsed.current >= durationMilliseconds) {
      cancelAnimationFrame(animationRequestID.current);
      runComplete();
    } else {
      animationRequestID.current = requestAnimationFrame(animationLoop.current);
      isRunning(Math.min(tempElapsed.current / durationMilliseconds, 1));
    }
  });

  useEffect(() => {
    animationLoop.current();

    return () => {
      cancelAnimationFrame(animationRequestID.current);
      runStarted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!runStarted.current) {
      runStarted.current = true;
    } else {
      if (runningIsPaused) {
        cancelAnimationFrame(animationRequestID.current);
        elapsedAtPause.current = tempElapsed.current;
      } else {
        lastTime.current = performance.now() - elapsedAtPause.current;
        animationLoop.current();
      }
    }

    return () => {
      cancelAnimationFrame(animationRequestID.current);
    };
  }, [runningIsPaused]);

  return <></>;
}

export default Runner;
