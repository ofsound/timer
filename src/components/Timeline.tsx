import { useState } from "react";
import Runner from "./Runner.tsx";

type inputProps = {
  sequenceArray: number[];
  timelineRunning: (a: number, b: number) => void;
  timelineComplete: () => void;
};

function Timeline({ sequenceArray, timelineRunning, timelineComplete }: inputProps) {
  const [runnerID, setRunnerID] = useState(0);

  const handleIsRunning = (runnerRatio: number) => {
    timelineRunning(runnerID, runnerRatio);
  };

  const handleRunComplete = () => {
    if (runnerID < sequenceArray.length - 1) {
      setRunnerID(runnerID + 1);
    } else {
      timelineComplete();
    }
  };

  return (
    <>
      <Runner
        key={runnerID}
        durationMilliseconds={1000 * sequenceArray[runnerID]}
        isRunning={handleIsRunning}
        runComplete={handleRunComplete}
      />
    </>
  );
}

export default Timeline;
