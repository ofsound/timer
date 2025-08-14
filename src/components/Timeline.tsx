import { useState, useEffect } from "react";
import Runner from "./Runner.tsx";

import { useTimerStore } from "../store.ts";

type inputProps = {
  sequenceArray: number[];
  timelineComplete: () => void;
  timelinePaused: boolean;
};

function Timeline({ sequenceArray, timelineComplete, timelinePaused }: inputProps) {
  const setThisRatio = useTimerStore((state) => state.setThisRatio);
  const setThisStep = useTimerStore((state) => state.setThisStep);
  // const lastStep = useTimerStore((state) => state.lastStep);
  // const setLastStep = useTimerStore((state) => state.setLastStep);

  const [runnerIndex, setRunnerIndex] = useState(0);

  const handleIsRunning = (runnerRatio: number) => {
    setThisRatio(runnerRatio);
    setThisStep(runnerIndex);
  };

  const handleRunComplete = () => {
    if (runnerIndex < sequenceArray.length - 1) {
      setRunnerIndex(runnerIndex + 1);
      timelineComplete();
    } else {
      timelineComplete();
    }
  };

  useEffect(() => {
    console.log("pause or unpause timeline", timelinePaused);
  }, [timelinePaused]);

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
