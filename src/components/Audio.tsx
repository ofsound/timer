// import { useState } from "react";

type inputProps = {
  currentArray: number[];
};

function Audio({ currentArray }: inputProps) {
  return (
    <>
      <div className="mx-10 mt-6 flex justify-start gap-2 rounded-lg border-dashed border-white p-2 has-[div]:border">
        {currentArray.map((inner, index) => (
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

export default Audio;
