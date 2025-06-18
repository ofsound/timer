import { useState } from "react";

import InputComponent from "./components/InputComponent.tsx";
import TimelineComponent from "./components/TimelineComponent.tsx";

function App() {
  const [showTimeline, setShowTimeline] = useState(false);
  const [currentArray, setCurrentArray] = useState<number[]>([]);

  const handleResetClick = () => {
    setShowTimeline(false);
  };

  const handleStartClick = () => {
    setShowTimeline(true);
  };

  const handleNewSequenceCreated = (data: number[]) => {
    // alert("new sequence");
    setCurrentArray(data);
  };

  return (
    <>
      <InputComponent newSequenceCreated={handleNewSequenceCreated} />

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
