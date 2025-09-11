import { useState } from "react";

import { useTimerStore } from "../store.ts";

function Inputs() {
  const setThisSequence = useTimerStore((state) => state.setThisSequence);
  const inputsAreEnabled = useTimerStore((state) => state.inputsAreEnabled);
  const setStartIsEnabled = useTimerStore((state) => state.setStartIsEnabled);
  const countInTime = useTimerStore((state) => state.countInTime);

  const buttonValues = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 75, 80, 90];

  const padValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

  const [currentSequence, setWorkingSequence] = useState<number[]>([]);

  const [padTotal, setPadTotal] = useState("");

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
  };

  const padAddHandler = () => {
    buttonClickHandler(parseInt(padTotal));
    setPadTotal("");
  };

  return (
    <>
      <div className="mr-auto ml-auto flex hidden max-h-1/4 w-full flex-wrap justify-between gap-[10px] pt-2">
        {buttonValues.map((item, index) => (
          <button
            onClick={() => buttonClickHandler(item)}
            key={index}
            className={`${!inputsAreEnabled ? "opacity-20 blur-[3px] grayscale" : "hover:border-blue-300"} flex aspect-1/1 max-h-3/7 w-1/6 grow-1 cursor-pointer items-center justify-center rounded-lg border border-blue-500 bg-blue-600 text-lg tracking-wider text-white`}
          >
            <div>{item}</div>
          </button>
        ))}
      </div>
      <div className="flex">
        <div className="mx-auto flex max-h-1/4 w-full flex-wrap justify-between gap-[10px] pt-2">
          {padValues.map((item, index) => (
            <button
              onClick={() => padButtonClickHandler(item)}
              key={index}
              className={`${!inputsAreEnabled ? "opacity-20 blur-[3px] grayscale" : "hover:border-blue-300"} flex aspect-1/1 max-h-3/7 w-1/4 grow-1 cursor-pointer items-center justify-center rounded-lg border border-blue-500 bg-blue-600 text-lg tracking-wider text-white`}
            >
              <div>{item}</div>
            </button>
          ))}
        </div>
        <div>
          <button onClick={padAddHandler} className="border-1 bg-gray-200 p-3 text-4xl">
            ⇧
          </button>
          <button onClick={() => setPadTotal("")} className="border-1 bg-gray-200 p-3 text-4xl">
            x
          </button>
          <input
            readOnly
            type="text"
            className="pointer-events-none mt-4 mr-10 ml-auto h-14 w-28 rounded-md border-1 border-dotted bg-gray-100 pr-5 text-right text-2xl font-bold tabular-nums"
            value={padTotal}
          />
        </div>
      </div>
    </>
  );
}

export default Inputs;
