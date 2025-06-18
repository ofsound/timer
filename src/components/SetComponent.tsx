import { useState, useEffect, useRef } from "react";

type inputProps = {
  durationMilliseconds: number;
  setComplete: () => void;
  trigger: boolean;
};

function SetComponent({ durationMilliseconds, setComplete, trigger }: inputProps) {
  const [progressValue, setProgressValue] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState("");
  const [elapsedMilliseconds, setElapsedMilliseconds] = useState(0);
  // const [lastTime, setLastTime] = useState(4);

  const hasRunRef = useRef(false);

  // let elapsedMilliseconds = 0;
  let lastTime: number;

  let animationRequestID: number;

  useEffect(() => {
    if (trigger) {
      if (!hasRunRef.current) {
        // setElapsedMilliseconds(0);
        lastTime = performance.now();
        hasRunRef.current = true;
      }
    }
    return () => {
      cancelAnimationFrame(animationRequestID);
    };
  }, [trigger]);

  const update = () => {
    console.log(performance.now() - lastTime);
    console.log(durationMilliseconds);

    setElapsedMilliseconds(performance.now() - lastTime);

    if (elapsedMilliseconds >= durationMilliseconds) {
      cancelAnimationFrame(animationRequestID);
      setComplete();
    } else {
      // console.log("updating else");
      animationRequestID = requestAnimationFrame(update);
      setProgressValue(Math.min(elapsedMilliseconds / durationMilliseconds, 1));
      setElapsedSeconds(Number(elapsedMilliseconds / 1000).toFixed(1) + "s");
    }
  };

  return (
    <section className="flex-1w-xl mt-8 ml-10 flex w-80 justify-between rounded-lg bg-gray-200 p-2 pr-5 first:mx-auto first:!bg-gray-900 first:opacity-50 odd:bg-gray-400 first:[&>:first-child]:text-white">
      <div className="mt-1 min-w-20 shrink-0 text-2xl">{elapsedSeconds}</div>
      <progress value={progressValue} className="mt-2 h-6 w-full"></progress>
    </section>
  );
}

export default SetComponent;
