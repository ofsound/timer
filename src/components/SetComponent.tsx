import { useState, useEffect, useRef } from "react";

import beepFile from "../assets/beep_01.wav";

type inputProps = {
  durationMilliseconds: number;
  setComplete: () => void;
  trigger: boolean;
};

function SetComponent({ durationMilliseconds, setComplete, trigger }: inputProps) {
  const beepAudio = new Audio(beepFile);

  const [progressValue, setProgressValue] = useState(0);

  const [elapsedMilliseconds, setElapsedMilliseconds] = useState(0);

  const hasRunRef = useRef(false);
  const lastTime = useRef(0);
  const animationRequestID = useRef(0);

  useEffect(() => {
    if (trigger) {
      if (!hasRunRef.current) {
        lastTime.current = performance.now();
        hasRunRef.current = true;
        update.current();
      }
    }
    return () => {
      cancelAnimationFrame(animationRequestID.current);
    };
  }, [trigger]);

  const update = useRef(() => {
    setElapsedMilliseconds(performance.now() - lastTime.current);

    const tempElapsed = performance.now() - lastTime.current;

    if (tempElapsed >= durationMilliseconds) {
      cancelAnimationFrame(animationRequestID.current);
      setComplete();

      beepAudio.play();
    } else {
      animationRequestID.current = requestAnimationFrame(update.current);
      setProgressValue(Math.min(tempElapsed / durationMilliseconds, 1));
    }
  });

  return (
    <section
      className="first:-[.6] mt-8 ml-10 flex w-xl flex-1 justify-between rounded-lg bg-gray-200 p-2 pr-5 first:origin-left first:scale-[.6] first:!bg-gray-700 first:opacity-50 odd:bg-gray-500 first:[&>:first-child]:text-white"
      style={{ width: `${durationMilliseconds / 40}px` }}
    >
      <div className="mt-1 min-w-20 shrink-0 text-2xl">
        {Number(Math.abs(durationMilliseconds - elapsedMilliseconds) / 1000).toFixed(1) + "s"}
      </div>

      {/*
      Maybe using a progress element here is a pointless hack if it's not cross browser
      And I could do more interesting effects
      */}

      <progress
        value={progressValue}
        className="mt-2 h-6 w-full [&::-webkit-progress-bar]:bg-black [&::-webkit-progress-value]:bg-green-400"
      ></progress>
    </section>
  );
}

export default SetComponent;
