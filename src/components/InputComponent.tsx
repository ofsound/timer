import { useState, useEffect } from "react";

type inputProps = {
  newSequenceCreated: (a: number[]) => void;
  restartTrigger: boolean;
};

function InputComponent({ newSequenceCreated, restartTrigger }: inputProps) {
  const buttonValueArray = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 75, 90, 120];

  const [workingArray, setWorkingArray] = useState<number[]>([]);

  const buttonClickHandler = (buttonValue: number) => {
    const tempArray = workingArray.map(function (i) {
      return i;
    });

    tempArray.push(buttonValue);

    setWorkingArray(tempArray);
    newSequenceCreated(tempArray);
  };

  useEffect(() => {
    if (restartTrigger) {
      setWorkingArray([]);
    }
    return () => {};
  }, [restartTrigger]);

  return (
    <>
      <div className="mx-auto mb-10 flex max-w-66 flex-wrap pt-8">
        {buttonValueArray.map((item, index) => (
          <button
            onClick={() => buttonClickHandler(item)}
            key={index}
            className="mx-auto mt-3 block w-18 cursor-pointer rounded-lg border border-blue-500 bg-blue-600 px-5 py-3 text-lg text-white"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="min-h-12">
        <div className="ml-10 flex justify-start">
          {workingArray.map((inner, index) => (
            <div
              style={{ width: `${inner * 2}px` }}
              key={index}
              className="mr-2 block rounded-lg bg-gray-200 py-3 text-center font-bold text-black even:bg-gray-500"
            >
              {inner}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default InputComponent;
