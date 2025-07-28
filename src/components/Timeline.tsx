import { useState, useEffect } from "react";
import Runner from "./Runner.tsx";

type inputProps = {
  sequenceArray: number[];
  timelineRunning: (a: number, b: number) => void;
  timelineComplete: () => void;
  timelinePaused: boolean;
};

function Timeline({ sequenceArray, timelineRunning, timelineComplete, timelinePaused }: inputProps) {
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

  useEffect(() => {
    console.log("pause or unpause timeline", timelinePaused);
    // Perform side effects here, e.g., fetching data, updating local state, etc.
  }, [timelinePaused]); // Dependency array: useEffect will re-run when someProp changes

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
