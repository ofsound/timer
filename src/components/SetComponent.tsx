import { useState } from "react";

import Runner from "./Runner.tsx";

type inputProps = {
  durationMilliseconds: number;
  setComplete: () => void;
  trigger: boolean;
};

function SetComponent({ durationMilliseconds, setComplete, trigger }: inputProps) {
  // So, this entire block is running every time anything changes
  console.log("SetComponent Created ");

  console.log(trigger);

  const [progressValue, setProgressValue] = useState(0);

  const progressReport = (currentProgress: number) => {
    // console.log(currentProgress);
    setProgressValue(currentProgress);
  };

  // These two sync to the display
  // const [progressValue, setProgressValue] = useState(0);
  // const [elapsedMilliseconds, setElapsedMilliseconds] = useState(0);

  // const hasRunRef = useRef(false);ç
  // These are useRef, so they don't get reset when this whole block constantly re-renders
  // const animationRequestID = useRef(0);
  // const lastTime = useRef(0);

  // I'm wrapping this in a useRef, I think so I can run it from inside useEffect
  // const update = useRef(() => {
  //   setElapsedMilliseconds(performance.now() - lastTime.current);

  //   const tempElapsed = performance.now() - lastTime.current;

  //   if (tempElapsed >= durationMilliseconds) {
  //     cancelAnimationFrame(animationRequestID.current);
  //     setComplete();
  //   } else {
  //     animationRequestID.current = requestAnimationFrame(update.current);
  //     setProgressValue(Math.min(tempElapsed / durationMilliseconds, 1));
  //   }
  // });

  // This listens for a trigger to be true
  // useEffect(() => {
  //   console.log("in useEffect");

  //   if (trigger) {
  //     if (!hasRunRef.current) {
  //       hasRunRef.current = true;
  //       lastTime.current = performance.now();
  //       update.current();
  //     }
  //   }
  // }, [trigger]);

  const handleRunnerComplete = () => {
    setComplete();
  };

  return (
    <section
      className="first:-[.6] mt-8 ml-10 flex w-xl flex-1 justify-between rounded-lg bg-gray-200 p-2 pr-5 first:origin-left first:scale-[.6] first:!bg-gray-700 first:opacity-50 odd:bg-gray-500 first:[&>:first-child]:text-white"
      style={{ width: `${durationMilliseconds / 30}px` }}
    >
      <div className="mt-1 min-w-20 shrink-0 text-2xl">
        {/* {Number(Math.abs(durationMilliseconds - elapsedMilliseconds) / 1000).toFixed(1) + "s"} */}
      </div>

      {trigger && (
        <Runner
          durationMilliseconds={durationMilliseconds}
          progressReport={progressReport}
          runComplete={handleRunnerComplete}
        />
      )}

      {/* using a progress here is pointless, not cross browser, could do more interesting effects */}

      <progress
        value={progressValue}
        className="mt-2 h-6 w-full [&::-webkit-progress-bar]:bg-black [&::-webkit-progress-value]:bg-green-400"
      ></progress>
    </section>
  );
}

export default SetComponent;
