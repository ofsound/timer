import { useState } from "react";
import { useTimerStore } from "../store.ts";

import { useSwipeable } from "react-swipeable";

function Inputs() {
  const setThisSequence = useTimerStore((state) => state.setThisSequence);
  const inputsAreEnabled = useTimerStore((state) => state.inputsAreEnabled);
  const setStartIsEnabled = useTimerStore((state) => state.setStartIsEnabled);
  const countInTime = useTimerStore((state) => state.countInTime);

  const buttonValues = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 75, 80, 90];

  const padValues = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

  const [currentSequence, setWorkingSequence] = useState<number[]>([]);

  const [toggleVariant, setToggleVariant] = useState(false);

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
    const valueToAdd = parseInt(padTotal);
    if (valueToAdd > 0) {
      buttonClickHandler(valueToAdd);
    }
    setPadTotal("");
  };

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
    if (direction === "Left" || direction === "Right") {
      setToggleVariant(!toggleVariant);
    }
  };

  return (
    <div {...handlers}>
      <div
        className={` ${toggleVariant ? "hidden" : "flex"} mr-auto ml-auto max-h-1/4 w-full flex-wrap justify-between gap-[10px] pt-2`}
      >
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
      <div className={`${toggleVariant ? "flex" : "hidden"} gap-4`}>
        <div className="mx-auto flex max-h-1/4 w-2/3 flex-wrap justify-between gap-[10px] pt-2">
          {padValues.map((item, index) => (
            <button
              onClick={() => padButtonClickHandler(item)}
              key={index}
              className={`${!inputsAreEnabled ? "opacity-20 blur-[3px] grayscale" : "hover:border-blue-300"} flex aspect-1/1 max-h-3/7 w-1/4 grow-1 cursor-pointer items-center justify-center rounded-lg border border-blue-500 bg-blue-600 text-2xl tracking-wider text-white`}
            >
              <div>{item}</div>
            </button>
          ))}
        </div>
        <div className="flex w-1/3 flex-col justify-between gap-10 pt-2">
          <div className="relative flex-1">
            <button onClick={() => setPadTotal("")} className="absolute top-0 right-0 block h-8 w-8 cursor-pointer">
              <span className="relative text-xl text-black">×</span>
            </button>
            <input
              readOnly
              type="text"
              className="pointer-events-none mt-0 ml-auto h-full w-full rounded-md border-1 border-dotted border-black bg-gray-100 pr-8 text-right text-2xl font-bold text-black tabular-nums"
              value={padTotal}
            />
          </div>
          <button
            onClick={padAddHandler}
            className="w-full flex-1 rounded-lg border-1 border-black bg-gray-700 p-3 text-4xl text-white"
          >
            ⇧
          </button>
        </div>
      </div>
    </div>
  );
}

export default Inputs;
