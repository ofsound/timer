import { useState, useRef } from "react";
import { useTimerStore } from "../store.ts";

import { useLongPress } from "use-long-press";

function Inputs() {
  const setThisSequence = useTimerStore((state) => state.setThisSequence);
  const inputsAreEnabled = useTimerStore((state) => state.inputsAreEnabled);
  const setStartIsEnabled = useTimerStore((state) => state.setStartIsEnabled);
  const countInTime = useTimerStore((state) => state.countInTime);

  const [buttonValues, setButtonValues] = useState([5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 75, 80, 90]);

  const padValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

  const [currentSequence, setWorkingSequence] = useState<number[]>([]);

  const [toggleVariant, setToggleVariant] = useState(false);

  const [padTotal, setPadTotal] = useState("");

  const [customInputValue, setCustomInputValue] = useState(0);

  const editedInputIndex = useRef(0);

  const buttonClickHandler = (buttonValue: number) => {
    if (!inputsAreEnabled) {
      return;
    }

    const updatedSequence = [...currentSequence].concat(buttonValue);
    setWorkingSequence(updatedSequence);
    setThisSequence([countInTime, ...updatedSequence]);
    setStartIsEnabled(true);
  };

  const padButtonClickHandler = (padButtonValue: string) => {
    setPadTotal(padTotal + padButtonValue);

    setCustomInputValue(parseInt(padTotal + padButtonValue));
  };

  const handlersPress = useLongPress((e) => {
    const childElement = (e.target as HTMLElement).firstChild;
    if (childElement) {
      setCustomInputValue(parseInt((childElement as HTMLElement).innerHTML));
      const parentElement = (e.target as HTMLElement).parentElement;
      const children = parentElement?.children; // This is an HTMLCollection
      const index = Array.prototype.indexOf.call(children, e.target as HTMLElement);
      editedInputIndex.current = index;
      setToggleVariant(!toggleVariant);
    }
  });

  const trySetCustomInputValue = (newValue: number) => {
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
    setToggleVariant(!toggleVariant);
  };

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
    <div>
      <div
        className={` ${toggleVariant ? "hidden" : "flex"} mr-auto ml-auto w-full flex-wrap justify-between gap-[10px]`}
      >
        {buttonValues.map((item, index) => (
          <button
            onClick={() => buttonClickHandler(item)}
            {...handlersPress()}
            key={index}
            className={`${!inputsAreEnabled ? "opacity-20 blur-[3px] grayscale" : "hover:border-blue-300"} flex aspect-1/1 max-h-3/7 w-1/6 grow-1 cursor-pointer items-center justify-center rounded-lg border border-blue-500 bg-blue-600 text-lg tracking-wider text-white`}
          >
            <div className="pointer-events-none">{convertSecondsToMinutesSeconds(item)}</div>
          </button>
        ))}
      </div>
      <div className={`${toggleVariant ? "flex" : "hidden"} -mt-6 gap-6`}>
        <div className="pointer-events-none absolute top-0 left-0 z-1 h-screen w-full bg-black opacity-90"></div>
        <div className="mx-auto flex w-5/8 flex-wrap justify-between gap-2">
          {padValues.map((item, index) => (
            <button
              onClick={() => padButtonClickHandler(item)}
              key={index}
              className={`${!inputsAreEnabled ? "opacity-20 blur-[3px] grayscale" : "hover:border-blue-300"} relative z-100 flex aspect-square w-1/4 grow-1 cursor-pointer items-center justify-center rounded-lg border border-gray-500 bg-gray-900 text-2xl tracking-wider text-white shadow-md`}
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
              className="absolute -top-1 -right-1 block h-8 w-8 cursor-pointer opacity-50"
            >
              <div className="h-full w-full text-xl text-white">×</div>
            </button>
            <input
              readOnly
              type="text"
              className="pr pointer-events-none mt-0 ml-auto aspect-square w-full flex-1 rounded-md border-1 border-dotted border-black bg-blue-700 text-center text-3xl font-bold text-white tabular-nums"
              value={convertSecondsToMinutesSeconds(customInputValue)}
            />
          </div>
          <div className="mt-6 flex w-full gap-3 self-center-safe">
            <button
              className="block aspect-square w-1/2 rounded-sm border-4 border-white bg-gray-200 text-2xl font-bold text-black shadow-md"
              onClick={() => trySetCustomInputValue(customInputValue - 1)}
            >
              <div className="relative -top-[.2rem] text-4xl text-black">–</div>
            </button>
            <button
              className="aspect-square w-1/2 rounded-sm border-4 border-white bg-gray-200 text-2xl font-bold shadow-md"
              onClick={() => trySetCustomInputValue(customInputValue + 1)}
            >
              <div className="relative -top-[.2rem] text-4xl text-black">+</div>
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${toggleVariant ? "flex" : "hidden"} relative z-10 mt-7 flex w-full gap-3 px-3 font-bold grayscale-50`}
      >
        <button
          onClick={handleCancel}
          className="text-md block w-full rounded-lg border-1 border-black bg-red-700 py-2 text-white"
        >
          ✕ &nbsp; Cancel
        </button>
        <button
          onClick={handleNewCustomValue}
          className="text-md block w-full rounded-lg border-1 border-black bg-green-700 py-2 text-white"
        >
          ⇧ &nbsp; Replace
        </button>
      </div>
    </div>
  );
}

export default Inputs;
