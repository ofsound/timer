import { useState } from "react";

import Inputs from "./components/Inputs.tsx";
import Timeline from "./components/Timeline.tsx";
import Map from "./components/Map.tsx";
// import Audio from "./components/Audio.tsx";
// import Cinema from "./components/Cinema.tsx";

function App() {
  const [thisStep, setThisStep] = useState(0);
  const [thisRatio, setThisRatio] = useState(0);

  const [showTimeline, setShowTimeline] = useState(false);
  const [currentArray, setCurrentArray] = useState<number[]>([]);

  const [showInputs, setShowInputs] = useState(true);
  const [InputsKey, setInputsKey] = useState(0);

  const [showMap, setShowMap] = useState(true);

  const [showStartButton, setShowStartButton] = useState(false);
  const [showResetButton, setShowResetButton] = useState(false);

  const handleResetClick = () => {
    setInputsKey((prevKey) => prevKey + 1);
    setShowInputs(true);

    setShowStartButton(false);
    setShowResetButton(false);

    setCurrentArray([]);
    setShowTimeline(false);
  };

  const handleStartClick = () => {
    setShowTimeline(true);
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
  };

  return (
    <>
      {showInputs && <Inputs key={InputsKey} newSequenceCreated={handleNewSequenceCreated} />}
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
      {showTimeline && <Timeline currentArray={currentArray} isRunning={handleIsRunning} />}
    </>
  );
}

export default App;
