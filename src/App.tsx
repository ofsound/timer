import { useState, useRef } from "react";

import { useSwipeable } from "react-swipeable";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

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
  playThis: (value: number) => void;
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
  const [showHistory, setShowHistory] = useState(false);
  const [showTimeline, setShowTimeline] = useState(false);

  const [inputsKey, setInputsKey] = useState(0);

  const soundRef = useRef<SoundComponent>(null);

  const container = useRef(null);
  const { contextSafe } = useGSAP();

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

  const toggleSettings = contextSafe(() => {
    if (!showSettings) {
      gsap.to("#content", { ease: "circ", duration: 0.5, y: -549 });
    } else {
      gsap.to("#content", { ease: "circ", duration: 0.5, y: 0 });
    }
    setShowSettings(!showSettings);
  });

  const toggleHistory = contextSafe(() => {
    if (!showHistory) {
      gsap.to("#content", { ease: "circ", duration: 0.5, y: 549 });
    } else {
      gsap.to("#content", { ease: "circ", duration: 0.5, y: 0 });
    }
    setShowHistory(!showHistory);
  });

  const handlers = useSwipeable({
    onSwiped: (eventData) => handleSwipe(eventData.dir),
    ...{
      delta: 10, // min distance(px) before a swipe starts.
      preventScrollOnSwipe: true, // prevents scroll during swipe
      trackTouch: true, // track touch input
      trackMouse: true, // track mouse input
      rotationAngle: 0, // set a rotation angle
      swipeDuration: Infinity, // allowable duration of a swipe (ms)
      touchEventOptions: { passive: true }, // options for touch listeners
    },
  });

  const handleSwipe = (direction: string) => {
    if (direction === "Up") {
      if (showHistory) {
        toggleHistory();
      } else if (!showSettings) {
        toggleSettings();
      }
    } else if (direction === "Down") {
      if (showSettings) {
        toggleSettings();
      } else if (!showHistory) {
        toggleHistory();
      }
    }
  };

  return (
    <div
      id="app"
      ref={container}
      className="h-full max-h-[549px] max-w-[375px] overflow-hidden bg-gray-700 duration-300"
    >
      <AppTools />
      <div
        {...handlers}
        id="content"
        className="relative mx-auto flex h-full max-h-[549px] max-w-[375px] flex-col bg-gray-600 px-5"
      >
        <button
          className="mx-auto mt-4 w-max rounded-md bg-gray-200 px-2 py-1 text-sm font-black opacity-20"
          onClick={toggleHistory}
        >
          History
        </button>

        <div className="relative mt-8 mb-auto flex h-full max-w-full">
          <Map />
          <button
            onClick={handleClearSequenceClick}
            className={` ${!startIsEnabled && ""} absolute -top-6 -right-6 block h-12 w-12 cursor-pointer`}
          >
            <div className="mx-auto h-8 w-8 rounded-full border-1 border-white bg-gray-600">
              <span className="relative -top-[4.5px] text-3xl text-white">×</span>
            </div>
          </button>
        </div>
        <div className="mt-3">
          <Inputs key={"inputs" + inputsKey} />
        </div>
        <div className="mt flex max-h-1/4 justify-center pt-4 pb-3">
          <Start onClick={handleStartClick} />
        </div>
        <button
          className="h mx-auto mt-4 mb-4 w-max rounded-md bg-gray-200 px-2 py-1 text-sm font-black opacity-20"
          onClick={toggleSettings}
        >
          Settings
        </button>
        <History onToggleClick={() => toggleHistory()} onToggleRowClick={() => toggleHistory()} />
        <Settings
          onToggleClick={() => toggleSettings()}
          onSoundChange={(newValue) => soundRef.current?.playThis(newValue)}
        />
        {showTimeline && <Timeline segmentComplete={handleSegmentComplete} timelineComplete={handleTimelineComplete} />}
        <Sound ref={soundRef} />
      </div>
    </div>
  );
}

export default App;
