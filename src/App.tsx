import { useState } from "react";

import InputComponent from "./components/InputComponent.tsx";
import TimelineComponent from "./components/TimelineComponent.tsx";

function App() {
  const [showTimeline, setShowTimeline] = useState(false);
  const [currentArray, setCurrentArray] = useState<number[]>([]);
  const [restartInputComponent, setRestartInputComponent] = useState(false);

  const [showInputComponent, setShowInputComponent] = useState(true);
  const [showStartButton, setShowStartButton] = useState(false);
  const [showResetButton, setShowResetButton] = useState(false);

  const [resetKey, setResetKey] = useState(0); // Initial key

  const handleResetClick = () => {
    setShowTimeline(false);
    setCurrentArray([]);
    setShowInputComponent(true);

    setResetKey((prevKey) => prevKey + 1);

    // setRestartInputComponent(true);

    // Why manually resetting this back to false?
    // i want to call a function,
    // not switch a variable and then switch it back
    setTimeout(() => {
      // setRestartInputComponent(false);
    }, 10);
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
      {showInputComponent && (
        <InputComponent
          key={resetKey}
          newSequenceCreated={handleNewSequenceCreated}
          restartTrigger={restartInputComponent}
        />
      )}
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
