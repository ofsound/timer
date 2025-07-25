import { useState, useRef } from "react";

import History from "./components/History.tsx";
import Inputs from "./components/Inputs.tsx";
import Timeline from "./components/Timeline.tsx";
import Map from "./components/Map.tsx";
import Sound from "./components/Sound.tsx";

interface SoundComponent {
  play: () => void;
}

interface historyRowObject {
  isPinned: boolean;
  sequenceArray: number[];
}

function App() {
  const appElement = document.getElementById("app") as HTMLElement;

  const [thisStep, setThisStep] = useState(-1);
  const [thisRatio, setThisRatio] = useState(0);

  const [showTimeline, setShowTimeline] = useState(false);
  const [sequenceArray, setSequenceArray] = useState<number[]>([]);

  const [historyArray, setHistoryArray] = useState<Array<historyRowObject>>([]);

  const [showInputs, setShowInputs] = useState(true);
  const [inputsKey, setInputsKey] = useState(0);

  const soundRef = useRef<SoundComponent>(null);

  const [showMap, setShowMap] = useState(true);

  const [showStartButton] = useState(true);
  const [showResetButton] = useState(true);

  const lastStep = useRef(0);

  const handleResetClick = () => {
    setInputsKey((prevKey) => prevKey + 1);
    setShowInputs(true);

    lastStep.current = 0;
    setThisRatio(0);
    setThisStep(-1);

    // setShowStartButton(false);
    // setShowResetButton(false);

    setSequenceArray([]);
    setShowTimeline(false);
  };

  const handleStartClick = () => {
    setShowTimeline(true);
    addToHistoryArray(sequenceArray);
  };

  const handleNewSequenceCreated = (newSequence: number[]) => {
    // setShowStartButton(true);
    // setShowResetButton(true);
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

  const addToHistoryArray = (launchedSequence: number[]) => {
    const tempArray = [...historyArray];

    const historyRowObject = {
      isPinned: false,
      sequenceArray: launchedSequence,
    };

    tempArray.push(historyRowObject);

    setHistoryArray(tempArray);
  };

  return (
    <div id="app" className="mx-auto flex h-full max-h-[549px] max-w-[375px] flex-col bg-gray-800 px-5 duration-300">
      {showInputs && <Inputs key={"inputs" + inputsKey} newSequenceCreated={handleNewSequenceCreated} />}
      {showMap && <Map sequenceArray={sequenceArray} thisStep={thisStep} thisRatio={thisRatio} />}
      <History historyArray={historyArray} newSequenceCreated={handleNewSequenceCreated} />
      <div className="mt-auto flex justify-center gap-4 pb-4">
        {showStartButton && (
          <button
            onClick={handleStartClick}
            className="block h-18 w-18 cursor-pointer rounded-full bg-green-800 px-3 py-3 text-white"
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
