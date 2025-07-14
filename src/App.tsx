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
  const [currentArray, setCurrentArray] = useState<number[]>([]);

  const [showInputs, setShowInputs] = useState(true);
  const [inputsKey, setInputsKey] = useState(0);

  const [showSound, setShowSound] = useState(false);
  const soundRef = useRef<SoundComponent>(null);

  const [showMap, setShowMap] = useState(true);
  // const [mapsKey, setMapsKey] = useState(0);

  const [showStartButton, setShowStartButton] = useState(false);
  const [showResetButton, setShowResetButton] = useState(false);

  const currentSet = useRef(0);

  const handleResetClick = () => {
    setInputsKey((prevKey) => prevKey + 1);
    setShowInputs(true);

    currentSet.current = 0;
    setThisRatio(0);
    setThisStep(0);

    setShowStartButton(false);
    setShowResetButton(false);

    setCurrentArray([]);
    setShowTimeline(false);
  };

  const handleStartClick = () => {
    setShowTimeline(true);
    // do i need this whole showSound structure anymore?
    setShowSound(true);
    // setShowInputs(false);
  };

  // rename this data param
  const handleNewSequenceCreated = (data: number[]) => {
    setShowStartButton(true);
    setShowResetButton(true);
    setShowMap(true);
    setCurrentArray(data);
  };

  const handleIsRunning = (runnerStep: number, runnerRatio: number) => {
    setThisRatio(runnerRatio);
    setThisStep(runnerStep);

    if (runnerStep !== currentSet.current) {
      currentSet.current = runnerStep;
      soundRef.current?.play();
    }
  };

  const handleIsComplete = () => {
    soundRef.current?.play();
  };

  return (
    <>
      {showInputs && <Inputs key={"inputs" + inputsKey} newSequenceCreated={handleNewSequenceCreated} />}
      {showMap && <Map currentArray={currentArray} thisRatio={thisRatio} thisStep={thisStep} />}
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
        <Timeline currentArray={currentArray} isRunning={handleIsRunning} isComplete={handleIsComplete} />
      )}
      {showSound && <Sound ref={soundRef} />}
    </>
  );
}

export default App;
