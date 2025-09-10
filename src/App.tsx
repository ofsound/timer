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

  const slidingContent = useRef(null);

  const settingsToggle = useRef(null);
  const historyToggle = useRef(null);

  const settingsTimerToggle = useRef(null);
  const historyTimerToggle = useRef(null);

  const [inputsKey, setInputsKey] = useState(0);

  const soundRef = useRef<SoundComponent>(null);

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

  const handleSegmentComplete = contextSafe(() => {
    soundRef.current?.play();
    blinkBackground();
  });

  const handleTimelineComplete = () => {
    soundRef.current?.play();
    blinkBackground();
    setShowTimeline(false);
    setThisStep(-1);
  };

  const blinkBackground = contextSafe(() => {
    gsap.to(slidingContent.current, {
      duration: 0.1,
      ease: "power2.out",
      filter: "brightness(2)",
    });
    gsap.to(slidingContent.current, {
      duration: 0.1,
      ease: "power2.out",
      filter: "brightness(1)",
      delay: 0.2,
    });
  });

  const toggleHistory = contextSafe(() => {
    let appHeight = 0;

    if (slidingContent.current) {
      appHeight = (slidingContent.current as HTMLElement).offsetHeight;
    }

    if (!showHistory) {
      gsap.to([settingsToggle.current, historyToggle.current], { ease: "circ", duration: 0.15, autoAlpha: 0 });
      gsap.to(slidingContent.current, {
        ease: "circ",
        duration: 0.5,
        y: appHeight,
        delay: 0.15,
      });
      gsap.to(historyTimerToggle.current, { ease: "circ", duration: 0.15, autoAlpha: 0.5, delay: 0.7 });
    } else {
      gsap.to(historyTimerToggle.current, { ease: "circ", duration: 0.15, autoAlpha: 0 });
      gsap.to(slidingContent.current, { ease: "circ", duration: 0.5, y: 0, delay: 0.15 });
      gsap.to([settingsToggle.current, historyToggle.current], {
        ease: "circ",
        duration: 0.15,
        autoAlpha: 0.2,
        delay: 0.7,
      });
    }
    setShowHistory(!showHistory);
  });

  const toggleSettings = contextSafe(() => {
    let appHeight = 0;

    if (slidingContent.current) {
      appHeight = (slidingContent.current as HTMLElement).offsetHeight;
    }

    if (!showSettings) {
      gsap.to([settingsToggle.current, historyToggle.current], { ease: "circ", duration: 0.15, autoAlpha: 0 });
      gsap.to(slidingContent.current, { ease: "circ", duration: 0.5, y: -appHeight, delay: 0.15 });
      gsap.to(settingsTimerToggle.current, { ease: "circ", duration: 0.15, autoAlpha: 0.5, delay: 0.7 });
    } else {
      gsap.to(settingsTimerToggle.current, { ease: "circ", duration: 0.15, autoAlpha: 0 });
      gsap.to(slidingContent.current, { ease: "circ", duration: 0.5, y: 0, delay: 0.15 });
      gsap.to([settingsToggle.current, historyToggle.current], {
        ease: "circ",
        duration: 0.15,
        autoAlpha: 0.15,
        delay: 0.7,
      });
    }
    setShowSettings(!showSettings);
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
    <div {...handlers} className="relative z-50 h-full overflow-hidden bg-gray-700 duration-300">
      <AppTools />
      <div ref={slidingContent} className="mx-auto flex h-full flex-col bg-gray-600 px-5 pb-18 [&>*]:pt-6">
        <div className="relative mt-8 mb-auto flex h-full">
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
        <div className="mt flex max-h-1/4 justify-center pt-4">
          <Start onClick={handleStartClick} />
        </div>
        <History onToggleRowClick={() => toggleHistory()} />
        <Settings onSoundChange={(newValue) => soundRef.current?.playThis(newValue)} />
        {showTimeline && <Timeline segmentComplete={handleSegmentComplete} timelineComplete={handleTimelineComplete} />}
        <Sound ref={soundRef} />
      </div>
      <button
        ref={settingsTimerToggle}
        onClick={toggleSettings}
        className="absolute top-0 right-0 left-0 mx-auto mt-4 block w-max rounded-md bg-gray-400 px-2 py-1 text-sm font-bold text-black opacity-0"
      >
        Timer
      </button>
      <button
        ref={historyToggle}
        className="absolute top-0 right-0 left-0 mx-auto mt-4 w-max rounded-md bg-gray-200 px-2 py-1 text-sm font-black opacity-100"
        onClick={toggleHistory}
      >
        History
      </button>

      <button
        ref={historyTimerToggle}
        onClick={toggleHistory}
        className="absolute right-0 bottom-4 left-0 mx-auto mt-4 block w-max rounded-md bg-gray-200 px-2 py-1 text-sm font-black text-black opacity-0"
      >
        Timer
      </button>

      <button
        ref={settingsToggle}
        className="absolute right-0 bottom-4 left-0 mx-auto w-max rounded-md bg-gray-200 px-2 py-1 text-sm font-black opacity-100"
        onClick={toggleSettings}
      >
        Settings
      </button>
    </div>
  );
}

export default App;
