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

      {trigger && (
        <Runner
          durationMilliseconds={durationMilliseconds}
          runComplete={handleRunnerComplete}
          isRunning={handleIsRunning}
        />
      )}

  );
}

export default Segment;
