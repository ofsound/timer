import { useState, useRef } from "react";

import Map from "../components/Map.tsx";
import Pin from "../components/Pin.tsx";

import { useTimerStore } from "../store.ts";

interface historyRowObject {
  isPinned: boolean;
  sequence: number[];
}

function History() {
  const thisSequence = useTimerStore((state) => state.thisSequence);
  const setThisSequence = useTimerStore((state) => state.setThisSequence);

  const thisStep = useTimerStore((state) => state.thisStep);
  const setStartIsEnabled = useTimerStore((state) => state.setStartIsEnabled);

  const firstRenderAfterStart = useRef(true);

  const [history, setHistory] = useState<Array<historyRowObject>>(() => {
    try {
      const storedHistories = localStorage.getItem("history");
      return storedHistories ? JSON.parse(storedHistories) : [];
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return [];
    }
  });

  const handleRowClick = (index: number) => {
    setThisSequence(history[index].sequence);
    setStartIsEnabled(true);
  };

  const handlePinClick = (index: number) => {
    const tempHistory = [...history];
    tempHistory[index].isPinned = !tempHistory[index].isPinned;
    localStorage.setItem("history", JSON.stringify(tempHistory));
    setHistory(tempHistory);
  };

  if (thisStep === 0 && firstRenderAfterStart.current) {
    firstRenderAfterStart.current = false;

    const newHistory = [...history];
    const historyRowObject = {
      isPinned: false,
      sequence: thisSequence,
    };
    if (newHistory.length > 9) {
      const attemptSplice = (pinIndex: number) => {
        if (!newHistory[pinIndex].isPinned) {
          newHistory.splice(pinIndex, 1);
          return;
        } else {
          attemptSplice(pinAttemptIndex++);
        }
      };

      let pinAttemptIndex = 0;
      attemptSplice(pinAttemptIndex);
    }

    newHistory.push(historyRowObject);

    localStorage.setItem("history", JSON.stringify(newHistory));
    setHistory(newHistory);
  }

  if (thisStep === -1 && !firstRenderAfterStart.current) {
    firstRenderAfterStart.current = true;
  }

  return (
    <div className="absolute -top-full left-0 h-full w-full bg-gray-900 px-14 py-12 text-white">
      <div className="mx-auto mt-2 mb-auto flex h-full w-full flex-col">
        {history.map((historyRow, index) => (
          <div key={index} className="relative flex grow-1">
            <Map onClick={() => handleRowClick(index)} isHistoryMap={true} historySequence={historyRow.sequence} />
            <Pin isPinned={historyRow.isPinned} onClick={() => handlePinClick(index)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
