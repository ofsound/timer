import { useState } from "react";

import Inputs from "./components/Inputs.tsx";
import Timeline from "./components/Timeline.tsx";

function App() {
  const [showTimeline, setShowTimeline] = useState(false);
  const [currentArray, setCurrentArray] = useState<number[]>([]);

  const [showInputs, setShowInputs] = useState(true);
  const [InputsKey, setInputsKey] = useState(0);

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
    setShowInputs(false);
  };

  const handleNewSequenceCreated = (data: number[]) => {
    setShowStartButton(true);
    setShowResetButton(true);
    const tempArray = data.map((item) => item);
    tempArray.unshift(3);
    setCurrentArray(tempArray);
  };

  return (
    <>
      {showInputs && <Inputs key={InputsKey} newSequenceCreated={handleNewSequenceCreated} />}
      <div className="mt-10 flex justify-center gap-4">
        {showStartButton && (
          <button
            onClick={handleStartClick}
            className="mt-3 block cursor-pointer rounded-lg bg-green-800 px-3 py-2 text-white"
          >
            START
          </button>
        )}
        {showResetButton && (
          <button
            onClick={handleResetClick}
            className="mt-3 block cursor-pointer rounded-lg bg-red-800 px-3 py-2 text-white"
          >
            RESET
          </button>
        )}
      </div>
      {showTimeline && <Timeline currentArray={currentArray} />}
    </>
  );
}

export default App;
