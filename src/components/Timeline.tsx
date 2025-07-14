import { useState } from "react";
import Runner from "./Runner.tsx";

type inputProps = {
  currentArray: number[];
  isRunning: (a: number, b: number) => void;
  isComplete: () => void;
};

function Timeline({ currentArray, isRunning, isComplete }: inputProps) {
  const [runnerID, setRunnerID] = useState(0);

  const handleIsRunning = (runnerRatio: number) => {
    isRunning(runnerID, runnerRatio);
  };

  const handleRunnerComplete = () => {
    if (runnerID < currentArray.length - 1) {
      setRunnerID(runnerID + 1);
    } else {
      // console.log("Timeline Complete.");
      isComplete();
    }
  };

  return (
    <>
      <Runner
        key={runnerID}
        durationMilliseconds={1000 * currentArray[runnerID]}
        isRunning={handleIsRunning}
        runComplete={handleRunnerComplete}
      />
    </>
  );
}

export default Timeline;
