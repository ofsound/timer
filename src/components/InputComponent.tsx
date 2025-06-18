import { useState, useEffect } from "react";
import { type ChangeEvent } from "react";

type inputProps = {
  newSequenceCreated: (a: number[]) => void;
  restartTrigger: boolean;
};

function InputComponent({ newSequenceCreated, restartTrigger }: inputProps) {
  const buttonValueArray = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 75, 90, 120];

  let firstClick: boolean;

  const [workingArray, setWorkingArray] = useState<number[]>([]);

  // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const newSeqArray = workingString.split(",").map((item) => parseInt(item.trim()));

  //   setWorkingArray(newSeqArray);
  //   newSequenceCreated(newSeqArray);
  // };

  const buttonClickHandler = (buttonValue: number) => {
    let tempArray = workingArray.map(function (i) {
      return i;
    });

    if (firstClick) {
      firstClick = false;
      tempArray.push(buttonValue);
      // setWorkingString(workingString + buttonValue);
    } else {
      // setWorkingString(workingString + "," + buttonValue);
      tempArray.push(buttonValue);
      console.log(tempArray);

      // console.log(tempArray);
    }

    setWorkingArray(tempArray);
    newSequenceCreated(tempArray);
  };

  useEffect(() => {
    firstClick = true;

    return () => {};
  }, []); // Empty dependency array

  useEffect(() => {
    if (restartTrigger) {
      // setWorkingString("");
      setWorkingArray([]);
      firstClick = true;
    }
    return () => {};
  }, [restartTrigger]);

  const jsxElements = buttonValueArray.map((item, index) => (
    <button
      onClick={() => buttonClickHandler(item)}
      key={index}
      className="mx-auto mt-2 block w-16 cursor-pointer rounded-lg border px-5 py-3 text-white"
    >
      {item}
    </button>
  ));

  const miniElements = workingArray.map((inner, index) => (
    <div
      style={{ width: `${inner * 2}px` }}
      key={index}
      className="mr-2 block rounded-lg bg-gray-200 py-3 text-center font-bold text-black even:bg-gray-500"
    >
      {inner}
    </div>
  ));

  return (
    <>
      <div className="mx-auto mb-10 flex max-w-60 flex-wrap pt-20">{jsxElements}</div>

      <div className="min-h-12">
        <div className="ml-10 flex justify-start">{miniElements}</div>
      </div>

      <div className="text-amber-200">{workingArray.join(" ")}</div>
    </>
  );
}

export default InputComponent;
