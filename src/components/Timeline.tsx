import { useState } from "react";
import Runner from "./Runner.tsx";

type inputProps = {
  currentArray: number[];
};

function Timeline({ currentArray }: inputProps) {
  const [runnerID, setRunnerID] = useState(0);

  const handleIsRunning = (runnerRatio: number) => {
    console.log(runnerRatio);
  };

  const handleRunnerComplete = () => {
    if (runnerID < currentArray.length - 1) {
      setRunnerID(runnerID + 1);
    } else {
      console.log("Timeline Complete.");
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
