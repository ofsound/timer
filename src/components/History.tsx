// import { useState } from "react";
// import Map from "../components/Map.tsx";
// import Pin from "../components/Pin.tsx";

// interface historyRowObject {
//   isPinned: boolean;
//   sequenceArray: number[];
// }

function History() {
  // const [historyArray] = useState<Array<historyRowObject>>(() => {
  //   try {
  //     const storedArray = localStorage.getItem("historyArray");
  //     return storedArray ? JSON.parse(storedArray) : [];
  //   } catch (error) {
  //     console.error("Error reading from localStorage:", error);
  //     return [];
  //   }
  // });

  // move to own component

  // const handleRowClick = (index: number) => {
  // newSequenceCreated(historyArray[index].sequenceArray, true);
  // };

  // const addToHistoryArray = (launchedSequence: number[]) => {
  //   const tempArray = [...historyArray];

  //   const historyRowObject = {
  //     isPinned: false,
  //     sequenceArray: launchedSequence,
  //   };

  //   if (tempArray.length > 2) {
  //     const attemptSplice = (pinIndex: number) => {
  //       if (!tempArray[pinIndex].isPinned) {
  //         tempArray.splice(pinIndex, 1);
  //         return;
  //       } else {
  //         attemptSplice(pinAttemptIndex++);
  //       }
  //     };

  //     let pinAttemptIndex = 0;
  //     attemptSplice(pinAttemptIndex);
  //   }

  //   tempArray.push(historyRowObject);

  //   localStorage.setItem("historyArray", JSON.stringify(tempArray));

  //   setHistoryArray(tempArray);
  // };

  // const handlePinClick = (index: number) => {
  //   const tempHistoryArray = [...historyArray];
  //   tempHistoryArray[index].isPinned = !tempHistoryArray[index].isPinned;
  //   // updateHistoryArray(tempHistoryArray);
  // };

  return (
    <div className={`${"opacity-20 blur-[3px] grayscale"} mx-auto mt-2 mb-auto flex aspect-5/3 max-w-3/4 flex-col`}>
      {/* {historyArray.map((historyRow, index) => (
        <div key={index} className="relative flex grow-1">
          <Map onClick={() => handleRowClick(index)} isHistoryMap={true} />
          <Pin isPinned={historyArray[index].isPinned} onClick={() => handlePinClick(index)} />
        </div>
      ))} */}
    </div>
  );
}

export default History;
