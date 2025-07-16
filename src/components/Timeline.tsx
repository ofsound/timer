import { useState } from "react";
import Runner from "./Runner.tsx";

type inputProps = {
  sequenceArray: number[];
  timelineRunning: (a: number, b: number) => void;
  timelineComplete: () => void;
};

function Timeline({ sequenceArray, timelineRunning, timelineComplete }: inputProps) {
  const [runnerIndex, setRunnerIndex] = useState(0);

  const handleIsRunning = (runnerRatio: number) => {
    timelineRunning(runnerIndex, runnerRatio);
  };

  const handleRunComplete = () => {
    if (runnerIndex < sequenceArray.length - 1) {
      setRunnerIndex(runnerIndex + 1);
    } else {
      timelineComplete();
    }
  };

  return (
    <>
      <Runner
        key={runnerIndex}
        durationMilliseconds={1000 * sequenceArray[runnerIndex]}
        isRunning={handleIsRunning}
        runComplete={handleRunComplete}
      />
    </>
  );
}

export default Timeline;
