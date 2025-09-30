import { useRef, useState, useEffect } from "react";
import { useTimerStore } from "../timerStore.ts";

type inputProps = {
  isActive?: boolean;
  isComplete?: boolean;
  durationSeconds: number;
  isHistoryMapSegment?: boolean;

  isAlternatingMapSegment?: boolean;
};

function MapSegment({
  isActive,
  isComplete,
  durationSeconds,
  isHistoryMapSegment,
  isAlternatingMapSegment,
}: inputProps) {
  const [isVisible, setIsVisible] = useState(false);

  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const [outerWidth, setOuterWidth] = useState(0);
  const [innerWidth, setInnerWidth] = useState(0);

  const classesOuter = [
    "relative h-full rounded-lg border border-black overflow-hidden dark:bg-gray-100 bg-gray-800 text-center text-black first:hidden ",
    isAlternatingMapSegment && "dark:odd:bg-gray-400 odd:bg-gray-500",
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
    isVisible && "opacity-100 scale-100",
    innerWidth > outerWidth && "hidden",
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

    if (outerRef.current) {
      setOuterWidth((outerRef.current as HTMLElement).clientWidth);
    }
    if (innerRef.current) {
      setInnerWidth((innerRef.current as HTMLElement).clientWidth);
    }

    const resizeObserver = new ResizeObserver(() => {
      if (outerRef.current) {
        setOuterWidth((outerRef.current as HTMLElement).clientWidth);
      }
    });

    if (outerRef.current) {
      resizeObserver.observe(outerRef.current);
    }
  }, []);

  return (
    <div style={{ width: `${durationSeconds * widthScaleFactor}px` }} className={classesOuter} ref={outerRef}>
      <div className="hidden text-xs">{innerWidth}</div>
      <div className="hidden text-xs">{outerWidth}</div>
      <div
        style={{ transform: isActive ? "scaleX(" + thisRatio + ")" : "scaleX(0)" }}
        className={`absolute h-full w-full origin-left bg-green-600 bg-gradient-to-r from-green-600 to-green-400`}
      ></div>
      <div className={classesInner}>
        <div ref={innerRef}>{convertSecondsToMinutesSeconds(durationSeconds)}</div>
      </div>
    </div>
  );
}

export default MapSegment;
