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

    // This manually resesting this back to false.. i want to call a function
    // not switch a variable and then switch it back
    setTimeout(() => {
      setRestartInputComponent(false);
    }, 2000);
  };

  const handleStartClick = () => {
    setShowTimeline(true);
  };

  const handleNewSequenceCreated = (data: number[]) => {
    setCurrentArray(data);
    console.log("set current array in app");
  };

  return (
    <>
      <div className="text-2xl text-amber-400">{currentArray.join(" ")}</div>
      <InputComponent
        newSequenceCreated={handleNewSequenceCreated}
        restartTrigger={restartInputComponent}
      />
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
      {showTimeline && <TimelineComponent currentArray={currentArray} />}
    </>
  );
}

export default App;
