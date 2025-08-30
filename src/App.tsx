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

function App() {
  const thisStep = useTimerStore((state) => state.thisStep);
  const setThisStep = useTimerStore((state) => state.setThisStep);
  const setThisRatio = useTimerStore((state) => state.setThisRatio);
  const setThisSequence = useTimerStore((state) => state.setThisSequence);

  const startIsEnabled = useTimerStore((state) => state.startIsEnabled);
  const setStartIsEnabled = useTimerStore((state) => state.setStartIsEnabled);
  const setInputsAreEnabled = useTimerStore((state) => state.setInputsAreEnabled);

  const appElement = document.getElementById("app") as HTMLElement; // should be ref

  const [showTimeline, setShowTimeline] = useState(false);

  const [inputsKey, setInputsKey] = useState(0); // so dumb

  const soundRef = useRef<SoundComponent>(null);

  // these are the 4 big events, or something?
  const handleClearSequenceClick = () => {
    setInputsKey((prevKey) => prevKey + 1);

    setInputsAreEnabled(true);

    setThisStep(-1);
    setThisRatio(0);
    setThisSequence([]);
    setShowTimeline(false);

    setStartIsEnabled(false);
  };

  const handleStartClick = () => {
    soundRef.current?.play();

    switch (thisStep) {
      case -1:
        setThisStep(0);
        setShowTimeline(true);
        break;
      case 0:
        break;
      default:
        alert("pause?");
        break;
    }
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

  return (
    <div id="app" className={`${""} h-full bg-gray-700 duration-300`}>
      <AppTools />
      <div className="mx-auto flex h-full max-h-[549px] max-w-[375px] flex-col border-1 px-5">
        <History />
        <div className="relative mt-8 mb-auto flex h-full max-w-full">
          <Map />
          <button
            onClick={handleClearSequenceClick}
            className={` ${!startIsEnabled && "grayscale"} absolute -top-4 -right-4 block h-8 w-8 cursor-pointer rounded-full border-1 border-white bg-gray-700`}
          >
            <span className="relative -top-[3px] text-2xl text-white">×</span>
          </button>
        </div>
        <div className="mt-4">
          <Inputs key={"inputs" + inputsKey} />
        </div>
        <div className="mt flex max-h-1/4 justify-center pt-3 pb-3">
          <Start onClick={handleStartClick} />
        </div>
        {showTimeline && (
          <Timeline
            timelinePaused={false}
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
