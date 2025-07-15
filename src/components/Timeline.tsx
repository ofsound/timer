import { useState } from "react";
import Runner from "./Runner.tsx";

type inputProps = {
  currentArray: number[];
  isRunning: (a: number, b: number) => void;
  runComplete: () => void;
};

function Timeline({ currentArray, isRunning, runComplete }: inputProps) {
  const [runnerID, setRunnerID] = useState(0);

  const handleIsRunning = (runnerRatio: number) => {
    isRunning(runnerID, runnerRatio);
  };

  const handleRunComplete = () => {
    if (runnerID < currentArray.length - 1) {
      setRunnerID(runnerID + 1);
    } else {
      runComplete();
    }
  };

  return (
    <>
      <Runner
        key={runnerID}
        durationMilliseconds={1000 * currentArray[runnerID]}
        isRunning={handleIsRunning}
        runComplete={handleRunComplete}
      />
    </>
  );
}

export default Timeline;
