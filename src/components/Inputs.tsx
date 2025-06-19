import { useState } from "react";

type inputProps = {
  newSequenceCreated: (a: number[]) => void;
};

function Inputs({ newSequenceCreated }: inputProps) {
  const buttonValueArray = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 75, 90, 120];

  const [workingArray, setWorkingArray] = useState<number[]>([]);

  const buttonClickHandler = (buttonValue: number) => {
    const updatedArray = [...workingArray].concat(buttonValue);

    // If I'm sending this same array name to a function in the parent,
    // and using it here as a state variable... how connected are those really?
    setWorkingArray(updatedArray);

    // Add the count-in timer to this one .unshift() on the array to alter it?
    newSequenceCreated(updatedArray);
  };

  return (
    <>
      <div className="mx-auto mb-10 flex max-w-66 flex-wrap pt-8">
        {buttonValueArray.map((item, index) => (
          <button
            onClick={() => buttonClickHandler(item)}
            key={index}
            className="mx-auto mt-3 block w-18 cursor-pointer rounded-lg border border-blue-500 bg-blue-600 px-5 py-4 text-lg tracking-wider text-white hover:border-blue-300"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mx-10 mt-10 flex justify-start gap-2 rounded-lg border-dashed border-white p-2 has-[div]:border">
        {workingArray.map((inner, index) => (
          <div
            style={{ width: `${inner * 4}px` }}
            key={index}
            className="block rounded-lg border border-black bg-gray-200 py-3 text-center font-bold text-black even:bg-gray-500"
          >
            {inner}
          </div>
        ))}
      </div>
    </>
  );
}

export default Inputs;
