import { useState, useRef, useEffect } from "react";
import { useTimerStore } from "../timerStore.ts";
import { useUserStore } from "../userStore.ts";

import type { MouseEvent } from "react";

import { useLongPress } from "use-long-press";

import useEscapeKey from "../useEscapeKey.ts";

type inputProps = {
  escapeKeyToApp: () => void;
};

function Inputs({ escapeKeyToApp }: inputProps) {
  const setThisSequence = useTimerStore((state) => state.setThisSequence);
  const setStartIsEnabled = useTimerStore((state) => state.setStartIsEnabled);

  const countInTime = useUserStore((state) => state.countInTime);
  const buttonValues = useUserStore((state) => state.buttonValues);
  const setButtonValues = useUserStore((state) => state.setButtonValues);

  const padValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

  const [currentSequence, setWorkingSequence] = useState<number[]>([]);

  const [toggleVariant, setToggleVariant] = useState(false);

  const [padTotal, setPadTotal] = useState("");

  const [customInputValue, setCustomInputValue] = useState(0);

  const editedInputIndex = useRef(0);

  const [isMouseDown, setIsMouseDown] = useState(false);

  const mouseDownOnPlusNotMinus = useRef(false);

  const plusElementRef = useRef(null);
  const minusElementRef = useRef(null);

  const handleMouseDown = (event: MouseEvent) => {
    if ((event.target as HTMLElement).innerHTML === "+") {
      mouseDownOnPlusNotMinus.current = true;
    } else {
      mouseDownOnPlusNotMinus.current = false;
    }

    mouseDownStartTime.current = Date.now();
    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const mouseDownStartTime = useRef(0);

  useEffect(() => {
    if (isMouseDown) {
      const handleDuringMouseDown = () => {
        const timeSinceMouseDown = Date.now() - mouseDownStartTime.current;
        let deltaInputValue = 1;

        if (timeSinceMouseDown > 1000) {
          deltaInputValue = 2;
        }
        if (timeSinceMouseDown > 2000) {
          deltaInputValue = 5;
        }
        if (timeSinceMouseDown > 3000) {
          deltaInputValue = 10;
        }
        if (timeSinceMouseDown > 4000) {
          deltaInputValue = 20;
        }
        if (timeSinceMouseDown > 5000) {
          deltaInputValue = 30;
        }

        if (timeSinceMouseDown > 350) {
          if (mouseDownOnPlusNotMinus.current) {
            trySetCustomInputValue(customInputValue + deltaInputValue);
          } else {
            trySetCustomInputValue(customInputValue - deltaInputValue);
          }
        }
      };

      const interval = setInterval(handleDuringMouseDown, 80);
      return () => clearInterval(interval);
    }
  }, [isMouseDown, customInputValue]);

  useEffect(() => {
    if (isMouseDown) {
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isMouseDown]);

  const buttonClickHandler = (buttonValue: number) => {
    const updatedSequence = [...currentSequence].concat(buttonValue);
    setWorkingSequence(updatedSequence);
    setThisSequence([countInTime, ...updatedSequence]);
    setStartIsEnabled(true);
  };

  const padButtonClickHandler = (padButtonValue: string) => {
    if (padTotal.length < 2) {
      setPadTotal(padTotal + padButtonValue);
      setCustomInputValue(parseInt(padTotal + padButtonValue));
    } else if (padTotal.length === 2) {
      setPadTotal(padTotal + padButtonValue);
      setCustomInputValue(parseInt(padTotal + padButtonValue));

      const newTotal = padTotal + padButtonValue;
      const secondsTotal = parseInt(newTotal.slice(1));
      const firstChar = parseInt(newTotal[0]);
      const computedTotal = secondsTotal + firstChar * 60;
      setCustomInputValue(computedTotal);
    } else if (padTotal.length === 3) {
      const newTotal = padTotal + padButtonValue;

      const minutesChar = parseInt(newTotal.slice(0, 2));
      const secondsTotal = parseInt(newTotal.slice(-2));
      const computedTotal = secondsTotal + minutesChar * 60;
      setCustomInputValue(computedTotal);
    }
  };

  const handlersPress = useLongPress((e) => {
    const childElement = (e.target as HTMLElement).firstChild;
    if (childElement) {
      const existingValue = (e.target as HTMLInputElement).dataset.value;
      if (existingValue) {
        setCustomInputValue(parseInt(existingValue));
      }
      const parentElement = (e.target as HTMLElement).parentElement;
      const children = parentElement?.children;
      const index = Array.prototype.indexOf.call(children, e.target as HTMLElement);
      editedInputIndex.current = index;
      setToggleVariant(!toggleVariant);
    }
  });

  const trySetCustomInputValue = (newValue: number) => {
    setPadTotal("");
    setCustomInputValue(newValue);
  };

  const handleNewCustomValue = () => {
    const tempButtonValues = [...buttonValues];
    tempButtonValues[editedInputIndex.current] = customInputValue;

    tempButtonValues.sort((a, b) => a - b);

    setButtonValues(tempButtonValues);
    setToggleVariant(!toggleVariant);
  };

  const handleCancel = () => {
    setCustomInputValue(0);
    setPadTotal("");
    setToggleVariant(!toggleVariant);
  };

  const handleEscapeKey = () => {
    if (toggleVariant) {
      handleCancel();
    } else {
      escapeKeyToApp();
    }
  };

  useEscapeKey(handleEscapeKey);

  function convertSecondsToMinutesSeconds(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedMinutes = String(minutes);
    const formattedSeconds = String(seconds).padStart(2, "0");

    if (minutes > 0) {
      return `${formattedMinutes}:${formattedSeconds}`;
    } else {
      if (seconds === 0) {
        return "";
      } else {
        return seconds;
      }
    }
  }

  return (
    <div className="max-w mx-auto w-full max-w-[28rem]">
      <div
        className={` ${toggleVariant ? "hidden" : "flex"} mr-auto ml-auto w-full flex-wrap justify-between gap-[.4rem]`}
      >
        {buttonValues.map((item, index) => (
          <button
            onClick={() => buttonClickHandler(item)}
            {...handlersPress()}
            key={index}
            data-value={item}
            className="flex aspect-1/1 max-h-3/7 w-1/6 grow-1 cursor-pointer items-center justify-center rounded-lg border-blue-500 bg-blue-600 text-lg tracking-wider text-white hover:border-blue-300"
          >
            <div className="pointer-events-none">{convertSecondsToMinutesSeconds(item)}</div>
          </button>
        ))}
      </div>
      <div className={`${toggleVariant ? "flex" : "hidden"} mx-auto -mt-12 gap-6`}>
        <div className="absolute top-0 left-0 z-1 h-screen w-full bg-gray-800 opacity-98" onClick={handleCancel}></div>
        <div className="mx-auto flex w-5/8 flex-wrap justify-between gap-2">
          {padValues.map((item, index) => (
            <button
              onClick={() => padButtonClickHandler(item)}
              key={index}
              className="relative z-100 flex aspect-square w-1/4 grow-1 cursor-pointer items-center justify-center rounded-lg border border-gray-500 bg-gray-900 text-2xl tracking-wider text-white shadow-md hover:border-blue-300"
            >
              <div className="pointer-events-none">{item}</div>
            </button>
          ))}
        </div>
        <div className="relative z-1 flex w-3/8 flex-col">
          <div className="relative">
            <button
              onClick={() => {
                setCustomInputValue(0);
                setPadTotal("");
              }}
              className="absolute block h-full w-full cursor-pointer opacity-50"
            >
              <div className="relative -top-1 right-1 h-full w-full text-right text-xl text-white">×</div>
            </button>
            <input
              readOnly
              type="text"
              className="pointer-events-none mt-0 ml-auto aspect-square w-full flex-1 rounded-md border-1 border-dotted border-black bg-blue-700 text-center text-3xl font-bold text-white tabular-nums"
              value={convertSecondsToMinutesSeconds(customInputValue)}
            />
          </div>
          <div className="mt-6 flex w-full gap-3 self-center-safe">
            <button
              className="block aspect-square w-1/2 rounded-lg border-2 border-gray-500 bg-gray-300 text-2xl font-bold text-black shadow-md hover:border-blue-300"
              onClick={() => trySetCustomInputValue(customInputValue - 1)}
              ref={minusElementRef}
              onMouseDown={handleMouseDown}
            >
              <div className="relative -top-[.2rem] text-4xl text-black">–</div>
            </button>
            <button
              className="aspect-square w-1/2 rounded-lg border-2 border-gray-500 bg-gray-300 text-2xl font-bold shadow-md hover:border-blue-300"
              onClick={() => trySetCustomInputValue(customInputValue + 1)}
              ref={plusElementRef}
              onMouseDown={handleMouseDown}
            >
              <div className="relative -top-[.2rem] text-4xl text-black">+</div>
            </button>
          </div>
        </div>
      </div>
      <div className={`${toggleVariant ? "flex" : "hidden"} relative z-10 mt-7 flex w-full gap-3 grayscale-60`}>
        <button
          onClick={handleCancel}
          className="block w-full rounded-lg border border-gray-500 bg-gray-900 py-3 text-lg font-bold text-red-500"
        >
          <span className="relative top-[.1rem] text-xl">✕</span> &nbsp; Cancel
        </button>
        <button
          onClick={handleNewCustomValue}
          className="block w-full rounded-lg border border-gray-500 bg-gray-900 py-3 text-lg font-bold text-green-600"
        >
          <span className="text-xl">⇧</span> &nbsp; Replace
        </button>
      </div>
    </div>
  );
}

export default Inputs;
