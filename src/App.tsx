import { useState, useRef } from "react";

import History from "./components/History.tsx";
import Inputs from "./components/Inputs.tsx";
import Timeline from "./components/Timeline.tsx";
import Map from "./components/Map.tsx";
import Sound from "./components/Sound.tsx";

interface SoundComponent {
  play: () => void;
}

function App() {
  const appElement = document.getElementById("app") as HTMLElement;

  const [thisStep, setThisStep] = useState(-1);
  const [thisRatio, setThisRatio] = useState(0);

  const [showTimeline, setShowTimeline] = useState(false);
  const [sequenceArray, setSequenceArray] = useState<number[]>([]);

  const [historyArray, setHistoryArray] = useState<Array<Array<number>>>([
    [5, 5, 5, 15, 5],
    [5, 15, 5, 5, 5],
    [5, 5, 5, 15, 5],
    [5, 15, 5, 5, 5],
    [5, 5, 5, 15, 5],
  ]);

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
    setThisStep(-1);

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

  const handleTimelineRunning = (runnerStep: number, runnerRatio: number) => {
    setThisRatio(runnerRatio);
    setThisStep(runnerStep);

    if (runnerStep !== lastStep.current) {
      lastStep.current = runnerStep;
      handleStepComplete();
    }
  };

  const handleTimelineComplete = () => {
    handleStepComplete();
  };

  const handleStepComplete = () => {
    soundRef.current?.play();
    appElement.classList.add("bg-white");
    setTimeout(() => {
      appElement.classList.remove("bg-white");
    }, 350);
  };

  return (
    <div id="app" className="h-full bg-gray-800 px-10 duration-300">
      <div className="flex">
        <History historyArray={historyArray} newSequenceCreated={handleNewSequenceCreated} />
        {showInputs && <Inputs key={"inputs" + inputsKey} newSequenceCreated={handleNewSequenceCreated} />}
      </div>
      {showMap && <Map sequenceArray={sequenceArray} thisStep={thisStep} thisRatio={thisRatio} />}
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
      {/* maybe isRunning and RunComplete should be timelineIsRunning, timelineCompete  */}
      {showTimeline && (
        <Timeline
          sequenceArray={sequenceArray}
          timelineRunning={handleTimelineRunning}
          timelineComplete={handleTimelineComplete}
        />
      )}
      <Sound ref={soundRef} />
    </div>
  );
}

export default App;
