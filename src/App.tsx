import { useState, useRef } from "react";

import Inputs from "./components/Inputs.tsx";
import Map from "./components/Map.tsx";
import History from "./components/History.tsx";
import Start from "./components/Start.tsx";
import Timeline from "./components/Timeline.tsx";
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

  const [inputsKey, setInputsKey] = useState(0);

  const soundRef = useRef<SoundComponent>(null);

  const lastStep = useRef(0);

  const startEnabled = useRef(false);
  const inputsEnabled = useRef(true);

  const handleClearSequenceClick = () => {
    setInputsKey((prevKey) => prevKey + 1);

    inputsEnabled.current = true;

    lastStep.current = 0;
    setThisRatio(0);
    setThisStep(-1);

    setSequenceArray([]);
    setShowTimeline(false);

    startEnabled.current = false;
  };

  const handleStartClick = () => {
    if (!startEnabled.current) {
      return;
    }

    inputsEnabled.current = false;

    switch (thisStep) {
      case -1:
        setShowTimeline(true);
        addToHistoryArray(sequenceArray);
        break;
      case 0:
        break;
      default:
        alert("pause?");
        break;
    }
  };

  const handleNewSequenceCreated = (newSequence: number[]) => {
    setSequenceArray(newSequence);
    startEnabled.current = true;
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

    if (tempArray.length > 3) {
      tempArray.shift();
    }
    tempArray.push(historyRowObject);

    setHistoryArray(tempArray);
  };

  return (
    <div id="app" className="mx-auto flex h-full max-h-[549px] max-w-[375px] flex-col bg-gray-800 px-5 duration-300">
      <Inputs
        key={"inputs" + inputsKey}
        newSequenceCreated={handleNewSequenceCreated}
        isEnabled={inputsEnabled.current}
      />
      <div className="flex">
        <Map sequenceArray={sequenceArray} thisStep={thisStep} thisRatio={thisRatio} />
        <button
          onClick={handleClearSequenceClick}
          className={` ${!startEnabled.current && "grayscale"} block cursor-pointer pt-6 pl-3`}
        >
          ❌
        </button>
      </div>
      <History
        historyArray={historyArray}
        updateHistoryArray={setHistoryArray}
        newSequenceCreated={handleNewSequenceCreated}
      />
      <div className="mt-auto flex justify-center pb-3">
        <Start onClick={handleStartClick} thisStep={thisStep} thisRatio={thisRatio} isEnabled={startEnabled.current} />
      </div>
      {showTimeline && (
        <Timeline
          timelinePaused={false}
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
