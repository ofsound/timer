import { useState, useRef } from "react";

import AppTools from "./components/AppTools.tsx";
import Inputs from "./components/Inputs.tsx";
import Map from "./components/Map.tsx";
import History from "./components/History.tsx";
import Start from "./components/Start.tsx";
import Settings from "./components/Settings.tsx";
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

  const runningIsPaused = useTimerStore((state) => state.runningIsPaused);
  const setRunningIsPaused = useTimerStore((state) => state.setRunningIsPaused);

  const [showSettings, setShowSettings] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  const [inputsKey, setInputsKey] = useState(0);

  const soundRef = useRef<SoundComponent>(null);

  const handleClearSequenceClick = () => {
    setInputsKey((prevKey) => prevKey + 1);

    setThisStep(-1);
    setThisRatio(0);
    setThisSequence([]);

    setShowTimeline(false);

    setInputsAreEnabled(true);
    setStartIsEnabled(false);

    setRunningIsPaused(false);
  };

  const handleStartClick = () => {
    switch (thisStep) {
      case -1:
        soundRef.current?.play();
        setThisStep(0);
        setShowTimeline(true);
        setInputsAreEnabled(false);
        break;
      case 0:
        break;
      default:
        setRunningIsPaused(!runningIsPaused);
        break;
    }
  };

  const handleSegmentComplete = () => {
    soundRef.current?.play();
    document.getElementById("app")?.classList.add("bg-white");
    setTimeout(() => {
      document.getElementById("app")?.classList.remove("bg-white");
    }, 350);
  };

  const handleTimelineComplete = () => {
    soundRef.current?.play();
    document.getElementById("app")?.classList.add("bg-white");
    setTimeout(() => {
      document.getElementById("app")?.classList.remove("bg-white");
    }, 550);
    setShowTimeline(false);
    setThisStep(-1);
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div id="app" className="h-full bg-gray-700 duration-300">
      <AppTools />
      <div className="relative mx-auto flex h-full max-h-[549px] max-w-[375px] flex-col bg-gray-600 px-5">
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
        <button className="absolute right-0 bottom-2 z-10 rounded-md px-3 text-2xl" onClick={toggleSettings}>
          &#9881;
        </button>
        {showSettings && <Settings />}
        {showTimeline && <Timeline segmentComplete={handleSegmentComplete} timelineComplete={handleTimelineComplete} />}
        <Sound ref={soundRef} />
      </div>
    </div>
  );
}

export default App;
