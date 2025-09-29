import { useState, useEffect } from "react";
import { useTimerStore } from "../timerStore.ts";

type inputProps = {
  isActive?: boolean;
  isComplete?: boolean;
  durationSeconds: number;
  isHistoryMapSegment?: boolean;
  isPinnedMapSegment?: boolean;
};

function MapSegment({ isActive, isComplete, durationSeconds, isHistoryMapSegment, isPinnedMapSegment }: inputProps) {
  const [isVisible, setIsVisible] = useState(false);

  const classesOuter = [
    "relative h-full rounded-lg border border-black overflow-hidden dark:bg-gray-400 bg-gray-500 text-center text-black first:hidden dark:even:bg-gray-100 even:bg-gray-800",
    isComplete &&
      "border-gray-800 text-gray-800 !opacity-60 bg-[repeating-linear-gradient(45deg,_#666666_0,_#333333_.14rem,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed dark:bg-[repeating-linear-gradient(45deg,_#c1c1c1_0,_#e1e1e1_.15rem,_transparent_0,_transparent_50%)]",
    isHistoryMapSegment && "dark:shadow-sm",
  ]
    .filter(Boolean)
    .join(" ");

  const classesInner = [
    "absolute flex h-full w-full items-center justify-center dark:text-black text-white",
    isHistoryMapSegment && "text-sm font-bold",
    !isHistoryMapSegment && "text-lg font-bold transition-all duration-120 opacity-0 scale-95",
    isHistoryMapSegment && !isPinnedMapSegment && "text-xs",
    isVisible && "opacity-100 scale-100",
  ]
    .filter(Boolean)
    .join(" ");

  const thisRatio: number = useTimerStore((state) => state.thisRatio);
  const widthScaleFactor = 200;

  function convertSecondsToMinutesSeconds(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = String(minutes);
    const formattedSeconds = String(seconds).padStart(2, "0");

    if (minutes > 0) {
      return `${formattedMinutes}:${formattedSeconds}`;
    } else {
      return seconds;
    }
  }

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div style={{ width: `${durationSeconds * widthScaleFactor}px` }} className={classesOuter}>
      <div
        style={{ transform: isActive ? "scaleX(" + thisRatio + ")" : "scaleX(0)" }}
        className={`absolute h-full w-full origin-left bg-green-600 bg-gradient-to-r from-green-600 to-green-400`}
      ></div>
      <div className={classesInner}>
        <div>{convertSecondsToMinutesSeconds(durationSeconds)}</div>
      </div>
    </div>
  );
}

export default MapSegment;
