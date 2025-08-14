import { useState } from "react";

type inputProps = {
  newSequenceCreated: (a: number[], b: boolean) => void;
  isEnabled: boolean;
};

function Inputs({ newSequenceCreated, isEnabled }: inputProps) {
  const leadDuration = 5;
  const buttonValueArray = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  const [workingArray, setWorkingArray] = useState<number[]>([]);

  const buttonClickHandler = (buttonValue: number) => {
    if (!isEnabled) {
      return;
    }

    const updatedArray = [...workingArray].concat(buttonValue);

    setWorkingArray(updatedArray);
    newSequenceCreated([leadDuration, ...updatedArray], false);
  };

  return (
    <>
      <div className="mr-auto ml-auto flex max-h-1/4 w-full flex-wrap justify-between gap-[10px] pt-2">
        {buttonValueArray.map((item, index) => (
          <button
            onClick={() => buttonClickHandler(item)}
            key={index}
            className={`${!isEnabled ? "opacity-20 blur-[3px] grayscale" : "hover:border-blue-300"} flex aspect-1/1 max-h-3/7 w-1/6 grow-1 cursor-pointer items-center justify-center rounded-lg border border-blue-500 bg-blue-600 text-lg tracking-wider text-white`}
          >
            <div>{item}</div>
          </button>
        ))}
      </div>
    </>
  );
}

export default Inputs;
