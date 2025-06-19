import { useState } from "react";
import Runner from "./Runner.tsx";

type inputProps = {
  durationMilliseconds: number;
  widthRatio: number;
  setComplete: () => void;
  trigger: boolean;
};

function Segment({ durationMilliseconds, widthRatio, setComplete, trigger }: inputProps) {
  const handleRunnerComplete = () => {
    setComplete();
  };

  const [progressRatio, setProgressRatio] = useState(0);

  const handleIsRunning = (runnerRatio: number) => {
    setProgressRatio(runnerRatio);
  };

  return (
    <section
      className="my-4 justify-between rounded-lg bg-gray-200 px-5 pt-2 pb-5 first:origin-left first:scale-[1] first:!bg-gray-700 first:opacity-50 odd:bg-gray-500 first:[&>:first-child]:text-white"
      style={{ width: `${widthRatio * 100}%` }}
    >
      <div>{Number(Math.abs(durationMilliseconds - durationMilliseconds * progressRatio) / 1000).toFixed(1) + "s"}</div>

      <div className="bg-black">
        <div
          className="mt-1 h-10 bg-gradient-to-r from-blue-600 to-blue-400"
          style={{ width: `${progressRatio * 100}%` }}
        ></div>
      </div>

      {trigger && (
        <Runner
          durationMilliseconds={durationMilliseconds}
          runComplete={handleRunnerComplete}
          isRunning={handleIsRunning}
        />
      )}
    </section>
  );
}

export default Segment;
