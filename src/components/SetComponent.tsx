import { useState, useEffect } from "react";

type inputProps = {
  durationMilliseconds: number;
  setComplete: () => void;
  trigger: boolean;
};

function SetComponent({ durationMilliseconds, setComplete, trigger }: inputProps) {
  const [progressValue, setProgressValue] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState("");

  let elapsedMilliseconds = 0;

  let lastTime: number;
  let animationRequestID: number;

  useEffect(() => {
    return () => {
      cancelAnimationFrame(animationRequestID);
    };
  }, []);

  useEffect(() => {
    if (trigger) {
      startSet();
    }
  }, [trigger]);

  const update = () => {
    elapsedMilliseconds = performance.now() - lastTime;
    if (elapsedMilliseconds >= durationMilliseconds) {
      cancelAnimationFrame(animationRequestID);
      setComplete();
    } else {
      animationRequestID = requestAnimationFrame(update);
      setProgressValue(Math.min(elapsedMilliseconds / durationMilliseconds, 1));
      setElapsedSeconds(Number(elapsedMilliseconds / 1000).toFixed(1) + "s");
    }
  };

  const startSet = () => {
    elapsedMilliseconds = 0;
    lastTime = performance.now();
    update();
  };

  return (
    <section className="flex-1w-xl mt-8 ml-10 flex w-80 justify-between rounded-lg bg-gray-200 p-2 pr-5 first:mx-auto first:!bg-gray-900 first:opacity-50 odd:bg-gray-400 first:[&>:first-child]:text-white">
      <div className="mt-1 min-w-20 shrink-0 text-2xl">{elapsedSeconds}</div>
      <progress value={progressValue} className="mt-2 h-6 w-full"></progress>
    </section>
  );
}

export default SetComponent;
