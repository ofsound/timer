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

  const [showInputs, setShowInputs] = useState(true);
  const [inputsKey, setInputsKey] = useState(0);

  const soundRef = useRef<SoundComponent>(null);

  const lastStep = useRef(0);

  const handleResetClick = () => {
    setInputsKey((prevKey) => prevKey + 1);
    setShowInputs(true);

    lastStep.current = 0;
    setThisRatio(0);
    setThisStep(-1);

    setSequenceArray([]);
    setShowTimeline(false);
  };

  const handleStartClick = () => {
    setShowTimeline(true);
    addToHistoryArray(sequenceArray);
  };

  const handleNewSequenceCreated = (newSequence: number[]) => {
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
      <div className="flex">
        <Map sequenceArray={sequenceArray} thisStep={thisStep} thisRatio={thisRatio} />

        <button onClick={handleResetClick} className="block cursor-pointer pt-6 pl-3">
          ❌
        </button>
      </div>

      <History historyArray={historyArray} newSequenceCreated={handleNewSequenceCreated} />
      <div className="mt-auto flex justify-center gap-4 pb-4">
        <Start onClick={handleStartClick} thisStep={thisStep} thisRatio={thisRatio} />
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
