import { useRef, useEffect } from "react";

type inputProps = {
  durationMilliseconds: number;
  isRunning: (a: number) => void;
  runComplete: () => void;
};

function Runner({ durationMilliseconds, runComplete, isRunning }: inputProps) {
  const animationRequestID = useRef(0);
  const lastTime = useRef(performance.now());
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
    };
  }, []);

  return <></>;
}

export default Runner;
