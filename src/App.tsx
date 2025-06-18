import { useState } from "react";

import InputComponent from "./components/InputComponent.tsx";
import TimelineComponent from "./components/TimelineComponent.tsx";

function App() {
  const [showTimeline, setShowTimeline] = useState(false);
  const [currentArray, setCurrentArray] = useState<number[]>([]);
  const [restartInputComponent, setRestartInputComponent] = useState(false);

  const handleResetClick = () => {
    setShowTimeline(false);
    setCurrentArray([]);
    setRestartInputComponent(true);

    // Manually reseting this back to false
    // i want to call a function,
    // not switch a variable and then switch it back
    setTimeout(() => {
      setRestartInputComponent(false);
    }, 10);
  };

  const handleStartClick = () => {
    setShowTimeline(true);
  };

  const handleNewSequenceCreated = (data: number[]) => {
    setCurrentArray(data);
  };

  return (
    <>
      <InputComponent
        newSequenceCreated={handleNewSequenceCreated}
        restartTrigger={restartInputComponent}
      />

      <div className="flex justify-center gap-4">
        <button
          onClick={handleStartClick}
          className="mt-3 block cursor-pointer rounded-lg bg-green-800 px-3 py-2 text-white"
        >
          START
        </button>
        <button
          onClick={handleResetClick}
          className="mt-3 block cursor-pointer rounded-lg bg-red-800 px-3 py-2 text-white"
        >
          RESET
        </button>
      </div>

      {showTimeline && <TimelineComponent currentArray={currentArray} />}
    </>
  );
}

export default App;
