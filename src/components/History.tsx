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
  onToggleRowClick: () => void;
};

function History({ onToggleClick, onToggleRowClick }: inputProps) {
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
    const elementToMove = arr.splice(fromIndex, 1)[0];
    arr.splice(toIndex, 0, elementToMove);
    return arr;
  }

  const [dividerIndex, setDividerIndex] = useState(() => {
    let prevPinExists = false;

    for (let i = 0; i < history.length; i++) {
      if (history[i].isPinned) {
        prevPinExists = true;
      }
      if (prevPinExists && !history[i].isPinned) {
        return i;
        break;
      }
    }
    if (history[0]) {
      if (history[0].isPinned) {
        return history.length;
      } else {
        return 0;
      }
    }

    console.log("no init!");
  });

  const updateDividerIndex = () => {
    let prevPinExists = false;

    for (let i = 0; i < history.length; i++) {
      if (history[i]) {
        if (history[i].isPinned) {
          prevPinExists = true;
        }
        if (prevPinExists && !history[i].isPinned) {
          setDividerIndex(i);
          break;
        }
      }
    }

    if (history[0]) {
      if (history[0].isPinned) {
        setDividerIndex(history.length);
      } else {
        setDividerIndex(0);
      }
    }

    console.log("no update!");
  };

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
          newHistory = moveArrayRow(newHistory, index + 1, i);
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
    updateDividerIndex();
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

    updateDividerIndex();
    newHistory.splice(dividerIndex as number, 0, historyRowObject);
    localStorage.setItem("history", JSON.stringify(newHistory));
    setHistory(newHistory);
  }

  if (thisStep === -1 && !firstRenderAfterStart.current) {
    firstRenderAfterStart.current = true;
  }

  return (
    <div className="absolute -top-full left-0 flex h-full w-full flex-col bg-gray-800 pt-6 pb-4 text-white">
      <div className="mx-auto mb-auto flex w-full flex-1 flex-col">
        {history.map((historyRow, index) => (
          <div key={uuidv4()}>
            <div
              className={`${index !== dividerIndex && "hidden"} mx-auto mt-8 mb-3 h-1 w-full max-w-7/8 border-b-4 border-dotted border-gray-400`}
            ></div>
            <div
              className={`relative flex flex-col px-14 ${index === dividerIndex && "animate-pulse [&>*]:opacity-100!"}`}
            >
              <div className={`relative flex min-h-12 ${!historyRow.isPinned && "min-h-11! px-3 opacity-50"}`}>
                <Map
                  onClick={() => {
                    handleRowClick(index);
                    onToggleRowClick();
                  }}
                  isHistoryMap={true}
                  historySequence={historyRow.sequence}
                />
                <Pin isPinned={historyRow.isPinned} onClick={() => handlePinClick(index)} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={onToggleClick}
        className="mx-auto mt-4 block w-max rounded-md bg-gray-200 px-2 py-1 text-sm font-black text-black opacity-30"
      >
        Timer
      </button>
    </div>
  );
}

export default History;
