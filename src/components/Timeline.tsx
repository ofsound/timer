import { useState, useRef } from "react";
import Runner from "./Runner.tsx";

import beepFile from "../assets/beep_01.wav";

type inputProps = {
  currentArray: number[];
};

function Timeline({ currentArray }: inputProps) {
  const beepAudio = useRef(new Audio(beepFile));

  const [runnerID, setRunnerID] = useState(0);

  const handleRunnerComplete = () => {
    console.log("handleRunnerComplete called.");

    console.log(runnerID);
    console.log(currentArray.length);

    beepAudio.current.play();

    if (runnerID < currentArray.length - 1) {
      setRunnerID(runnerID + 1);
    } else {
      console.log("***");
    }
  };

  const handleIsRunning = (runnerRatio: number) => {
    // setProgressRatio(runnerRatio);
    console.log(runnerRatio);
  };

  return (
    <>
      <Runner
        durationMilliseconds={1000 * currentArray[runnerID]}
        runComplete={handleRunnerComplete}
        key={runnerID}
        isRunning={handleIsRunning}
      />
    </>
  );
}

export default Timeline;
