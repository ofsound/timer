import { useState, useRef } from "react";

import Inputs from "./components/Inputs.tsx";
import Timeline from "./components/Timeline.tsx";
import Map from "./components/Map.tsx";
import Sound from "./components/Sound.tsx";

interface SoundComponent {
  play: () => void;
}

function App() {
  const [thisStep, setThisStep] = useState(0);
  const [thisRatio, setThisRatio] = useState(0);

  const [showTimeline, setShowTimeline] = useState(false);
  const [sequenceArray, setSequenceArray] = useState<number[]>([]);

  const [showInputs, setShowInputs] = useState(true);
  const [inputsKey, setInputsKey] = useState(0);

  const soundRef = useRef<SoundComponent>(null);

  const [showMap, setShowMap] = useState(true);

  const [showStartButton, setShowStartButton] = useState(false);
  const [showResetButton, setShowResetButton] = useState(false);

  const lastStep = useRef(0);

  const handleResetClick = () => {
    setInputsKey((prevKey) => prevKey + 1);
    setShowInputs(true);

    lastStep.current = 0;
    setThisRatio(0);
    setThisStep(0);

    setShowStartButton(false);
    setShowResetButton(false);

    setSequenceArray([]);
    setShowTimeline(false);
  };

  const handleStartClick = () => {
    setShowTimeline(true);
  };

  const handleNewSequenceCreated = (newSequence: number[]) => {
    setShowStartButton(true);
    setShowResetButton(true);
    setShowMap(true);
    setSequenceArray(newSequence);
  };

  const handleIsRunning = (runnerStep: number, runnerRatio: number) => {
    setThisRatio(runnerRatio);
    setThisStep(runnerStep);

    if (runnerStep !== lastStep.current) {
      lastStep.current = runnerStep;
      soundRef.current?.play();
    }
  };

  const handleRunComplete = () => {
    soundRef.current?.play();
  };

  return (
    <>
      {showInputs && <Inputs key={"inputs" + inputsKey} newSequenceCreated={handleNewSequenceCreated} />}
      {showMap && <Map sequenceArray={sequenceArray} thisRatio={thisRatio} thisStep={thisStep} />}
      <div className="mt-6 flex justify-center gap-4">
        {showStartButton && (
          <button
            onClick={handleStartClick}
            className="block cursor-pointer rounded-lg bg-green-800 px-3 py-2 text-white"
          >
            START
          </button>
        )}
        {showResetButton && (
          <button
            onClick={handleResetClick}
            className="block cursor-pointer rounded-lg bg-red-800 px-3 py-2 text-white"
          >
            RESET
          </button>
        )}
      </div>
      {showTimeline && (
        <Timeline sequenceArray={sequenceArray} isRunning={handleIsRunning} runComplete={handleRunComplete} />
      )}
      <Sound ref={soundRef} />
    </>
  );
}

export default App;
