import { useState } from "react";

import InputComponent from "./components/InputComponent.tsx";
import TimelineComponent from "./components/TimelineComponent.tsx";

function App() {
  const [showTimeline, setShowTimeline] = useState(false);
  const [currentArray, setCurrentArray] = useState<number[]>([]);

  const [showInputComponent, setShowInputComponent] = useState(true);
  const [inputComponentKey, setInputComponentKey] = useState(0);

  const [showStartButton, setShowStartButton] = useState(false);
  const [showResetButton, setShowResetButton] = useState(false);

  const handleResetClick = () => {
    setShowTimeline(false);
    setInputComponentKey((prevKey) => prevKey + 1);
    setShowInputComponent(true);
    setCurrentArray([]);
  };

  const handleStartClick = () => {
    setShowTimeline(true);
    setShowInputComponent(false);
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
      {showInputComponent && <InputComponent key={inputComponentKey} newSequenceCreated={handleNewSequenceCreated} />}
      <div className="flex justify-center gap-4">
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
      {showTimeline && <TimelineComponent currentArray={currentArray} />}
    </>
  );
}

export default App;
