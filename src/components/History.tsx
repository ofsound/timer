import { useState, useRef } from "react";

import { v4 as uuidv4 } from "uuid";

import Map from "../components/Map.tsx";
import Pin from "../components/Pin.tsx";

import { useTimerStore } from "../store.ts";

interface historyRowObject {
  isPinned: boolean;
  sequence: number[];
}

type inputProps = {
  onToggleClick?: React.MouseEventHandler<HTMLElement>;
};

function History({ onToggleClick }: inputProps) {
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

  function moveArrayRow(arr: historyRowObject[], fromIndex: number, toIndex: number) {
    const elementToMove = arr.splice(fromIndex, 1)[0]; // splice returns an array, [0] gets the
    arr.splice(toIndex, 0, elementToMove);
    return arr;
  }

  const handlePinClick = (index: number) => {
    let newHistory = [...history];

    newHistory[index].isPinned = !newHistory[index].isPinned;

    if (newHistory[index].isPinned) {
      let prevPinExists = false;

      for (let i = 0; i < newHistory.length; i++) {
        if (newHistory[i].isPinned && i !== index) {
          prevPinExists = true;
        }
        if (prevPinExists && !newHistory[i].isPinned) {
          newHistory = moveArrayRow(newHistory, index, i);
          break;
        }
      }
      if (!prevPinExists) {
        newHistory = moveArrayRow(newHistory, index, 0);
      }
    } else {
      newHistory.splice(index, 1);
    }

    localStorage.setItem("history", JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  if (thisStep === 0 && firstRenderAfterStart.current) {
    firstRenderAfterStart.current = false;

    const newHistory = [...history];
    const historyRowObject = {
      isPinned: false,
      sequence: thisSequence,
    };
    if (newHistory.length > 7) {
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
    <div className="absolute -top-full left-0 flex h-full w-full flex-col bg-gray-900 px-14 py-6 text-white">
      <div className="mx-auto mb-auto flex w-full flex-1 flex-col">
        {history.map((historyRow, index) => (
          <div key={uuidv4()} className={`relative flex grow-1 ${!historyRow.isPinned && "opacity-70"}`}>
            <Map onClick={() => handleRowClick(index)} isHistoryMap={true} historySequence={historyRow.sequence} />
            <Pin isPinned={historyRow.isPinned} onClick={() => handlePinClick(index)} />
          </div>
        ))}
      </div>
      <button
        onClick={onToggleClick}
        className="mx-auto mt-4 block w-max rounded-md bg-gray-200 px-2 py-1 text-sm font-black text-black opacity-20"
      >
        Timer
      </button>
    </div>
  );
}

export default History;
