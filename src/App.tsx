import { useState, useRef } from "react";

import AppTools from "./components/AppTools.tsx";
import Inputs from "./components/Inputs.tsx";
import Map from "./components/Map.tsx";
import History from "./components/History.tsx";
import Start from "./components/Start.tsx";
import Timeline from "./components/Timeline.tsx";
import Sound from "./components/Sound.tsx";

import { useTimerStore } from "./store.ts";

interface SoundComponent {
  play: () => void;
}

interface historyRowObject {
  isPinned: boolean;
  sequenceArray: number[];
}

function App() {
  const thisStep = useTimerStore((state) => state.thisStep);
  const setThisStep = useTimerStore((state) => state.setThisStep);
  const setThisRatio = useTimerStore((state) => state.setThisRatio);

  const appElement = document.getElementById("app") as HTMLElement; // should be ref

  const [sequenceArray, setSequenceArray] = useState<number[]>([]); // << to zustand

  const [showTimeline, setShowTimeline] = useState(false);

  // move to own component
  const [historyArray, setHistoryArray] = useState<Array<historyRowObject>>(() => {
    try {
      const storedArray = localStorage.getItem("historyArray");
      return storedArray ? JSON.parse(storedArray) : [];
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return [];
    }
  });

  const [inputsKey, setInputsKey] = useState(0);

  const soundRef = useRef<SoundComponent>(null);

  const startEnabled = useRef(false);
  const inputsEnabled = useRef(true);

  const handleClearSequenceClick = () => {
    setInputsKey((prevKey) => prevKey + 1);

    inputsEnabled.current = true;

    setThisRatio(0);
    setThisStep(-1);

    setSequenceArray([]);
    setShowTimeline(false);

    startEnabled.current = false;
  };

  const handleStartClick = () => {
    soundRef.current?.play();

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

  const handleNewSequenceCreated = (newSequence: number[], fromHistory: boolean) => {
    if (fromHistory) {
      handleClearSequenceClick();
    }
    setSequenceArray(newSequence);
    startEnabled.current = true;
  };

  const handleSegmentComplete = () => {
    soundRef.current?.play();
    appElement.classList.add("bg-white");
    setTimeout(() => {
      appElement.classList.remove("bg-white");
    }, 350);
  };

  const handleTimelineComplete = () => {
    soundRef.current?.play();
    appElement.classList.add("bg-white");
    setTimeout(() => {
      appElement.classList.remove("bg-white");
    }, 550);
  };

  const addToHistoryArray = (launchedSequence: number[]) => {
    const tempArray = [...historyArray];

    const historyRowObject = {
      isPinned: false,
      sequenceArray: launchedSequence,
    };

    if (tempArray.length > 2) {
      const attemptSplice = (pinIndex: number) => {
        if (!tempArray[pinIndex].isPinned) {
          tempArray.splice(pinIndex, 1);
          return;
        } else {
          attemptSplice(pinAttemptIndex++);
        }
      };

      let pinAttemptIndex = 0;
      attemptSplice(pinAttemptIndex);
    }

    tempArray.push(historyRowObject);

    localStorage.setItem("historyArray", JSON.stringify(tempArray));

    setHistoryArray(tempArray);
  };

  // max-h-[549px] max-w-[375px]

  return (
    <div id="app" className={`${""} h-full bg-gray-700 duration-300`}>
      <AppTools />
      <div className="mx-auto flex h-full max-h-[549px] max-w-[375px] flex-col border-1 px-5">
        <History
          historyArray={historyArray}
          updateHistoryArray={setHistoryArray}
          newSequenceCreated={handleNewSequenceCreated}
          isEnabled={inputsEnabled.current}
        />
        <div className="relative mt-8 mb-auto flex h-full max-w-full">
          <Map sequenceArray={sequenceArray} thisStep={thisStep} />
          <button
            onClick={handleClearSequenceClick}
            className={` ${!startEnabled.current && "grayscale"} absolute -top-4 -right-4 block h-8 w-8 cursor-pointer rounded-full border-1 border-white bg-gray-700`}
          >
            <span className="relative -top-[3px] text-2xl text-white">×</span>
          </button>
        </div>
        <div className="mt-4">
          <Inputs
            key={"inputs" + inputsKey}
            newSequenceCreated={handleNewSequenceCreated}
            isEnabled={inputsEnabled.current}
          />
        </div>
        <div className="mt flex max-h-1/4 justify-center pt-3 pb-3">
          <Start onClick={handleStartClick} thisStep={thisStep} isEnabled={startEnabled.current} />
        </div>
        {showTimeline && (
          <Timeline
            timelinePaused={false}
            sequenceArray={sequenceArray}
            segmentComplete={handleSegmentComplete}
            timelineComplete={handleTimelineComplete}
          />
        )}
        <Sound ref={soundRef} />
      </div>
    </div>
  );
}

export default App;
