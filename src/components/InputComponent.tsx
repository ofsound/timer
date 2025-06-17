import { useState, useEffect } from "react";
import { type ChangeEvent } from "react";

type inputProps = {
  newSequenceCreated: (a: number[]) => void;
};

function InputComponent({ newSequenceCreated }: inputProps) {
  const buttonValueArray = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 75, 90, 120];

  let firstClick: boolean;

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    setInputValue(event.target.value);

    const newSeqArray = inputValue.split(",").map((item) => parseInt(item.trim()));

    newSequenceCreated(newSeqArray);
  };

  const buttonClickHandler = (buttonValue: number) => {
    if (firstClick) {
      firstClick = false;
      console.log(firstClick);
      setInputValue(inputValue + buttonValue);
    } else {
      setInputValue(inputValue + "," + buttonValue);
    }
    // newSequenceCreated(inputValue);
  };

  useEffect(() => {
    firstClick = true;

    return () => {
      console.log("Component unmounted");
    };
  }, []); // Empty dependency array

  const jsxElements = buttonValueArray.map((item, index) => (
    <button
      onClick={() => buttonClickHandler(item)}
      key={index}
      className="mx-auto mt-2 block w-16 cursor-pointer rounded-lg border px-5 py-3 text-white"
    >
      {item}
    </button>
  ));

  const miniElements = inputValue
    .split(",")
    .map((item) => parseInt(item.trim()))
    .map((inner, index) => (
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

      <input
        value={inputValue}
        onChange={handleInputChange}
        type="text"
        placeholder="Enter sequence"
        className="mx-auto mt-10 cursor-pointer rounded-lg border px-5 py-3 text-white"
      />
    </>
  );
}

export default InputComponent;
