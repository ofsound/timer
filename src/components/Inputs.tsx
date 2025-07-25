import { useState } from "react";

type inputProps = {
  newSequenceCreated: (a: number[]) => void;
};

function Inputs({ newSequenceCreated }: inputProps) {
  const leadDuration = 5;
  const buttonValueArray = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 75, 90, 120];

  const [workingArray, setWorkingArray] = useState<number[]>([]);

  const buttonClickHandler = (buttonValue: number) => {
    const updatedArray = [...workingArray].concat(buttonValue);

    setWorkingArray(updatedArray);

    newSequenceCreated([leadDuration, ...updatedArray]);
  };

  return (
    <>
      <div className="ml-auto flex flex-wrap justify-between gap-1 pt-2">
        {buttonValueArray.map((item, index) => (
          <button
            onClick={() => buttonClickHandler(item)}
            key={index}
            className="mt-2 block w-1/6 cursor-pointer rounded-lg border border-blue-500 bg-blue-600 py-2 text-lg tracking-wider text-white hover:border-blue-300"
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
}

export default Inputs;
