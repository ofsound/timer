import { useState } from "react";
import Runner from "./Runner.tsx";

import { useTimerStore } from "../store.ts";

type inputProps = {
  timelineComplete: () => void;
  segmentComplete: () => void;
};

function Timeline({ timelineComplete, segmentComplete }: inputProps) {
  const setThisRatio = useTimerStore((state) => state.setThisRatio);
  const setThisStep = useTimerStore((state) => state.setThisStep);
  const thisSequence = useTimerStore((state) => state.thisSequence);

  const [runnerIndex, setRunnerIndex] = useState(0);

  const handleIsRunning = (runnerRatio: number) => {
    setThisRatio(runnerRatio);
  };

  const handleRunComplete = () => {
    if (runnerIndex < thisSequence.length - 1) {
      setThisStep(runnerIndex + 1);
      setRunnerIndex(runnerIndex + 1);
      segmentComplete();
    } else {
      timelineComplete();
    }
  };

  return (
    <Runner
      key={runnerIndex}
      durationMilliseconds={1000 * thisSequence[runnerIndex]}
      isRunning={handleIsRunning}
      runComplete={handleRunComplete}
    />
  );
}

export default Timeline;
