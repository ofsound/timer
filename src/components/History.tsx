import { useState } from "react";
import Map from "../components/Map.tsx";
import Pin from "../components/Pin.tsx";

import { useTimerStore } from "../store.ts";

interface historyRowObject {
  isPinned: boolean;
  sequenceArray: number[];
}

function History() {
  const setThisSequence = useTimerStore((state) => state.setThisSequence);

  const [historyArray] = useState<Array<historyRowObject>>(() => {
    try {
      const storedArray = localStorage.getItem("historyArray");
      return storedArray ? JSON.parse(storedArray) : [];
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return [];
    }
  });

  const handleRowClick = (index: number) => {
    setThisSequence(historyArray[index].sequenceArray);
  };

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

  const handlePinClick = (index: number) => {
    const tempHistoryArray = [...historyArray];
    tempHistoryArray[index].isPinned = !tempHistoryArray[index].isPinned;
    // updateHistoryArray(tempHistoryArray);
  };

  return (
    <div className={`mx-auto mt-2 mb-auto flex aspect-5/3 max-w-3/4 flex-col`}>
      {historyArray.map((historyRow, index) => (
        <div key={index} className="relative flex grow-1">
          <Map onClick={() => handleRowClick(index)} isHistoryMap={true} historySequence={historyRow.sequenceArray} />
          <Pin isPinned={historyRow.isPinned} onClick={() => handlePinClick(index)} />
        </div>
      ))}
    </div>
  );
}

export default History;
