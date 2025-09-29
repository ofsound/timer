import { useState, useRef, useEffect } from "react";

import Map from "../components/Map.tsx";
import Pin from "../components/Pin.tsx";

import { useTimerStore } from "../timerStore.ts";
import { useUserStore } from "../userStore.ts";

interface historyRowObject {
  isPinned: boolean;
  sequence: number[];
}

type inputProps = {
  onToggleRowClick: () => void;
};

function History({ onToggleRowClick }: inputProps) {
  const thisSequence = useTimerStore((state) => state.thisSequence);
  const setThisSequence = useTimerStore((state) => state.setThisSequence);

  const thisStep = useTimerStore((state) => state.thisStep);
  const setStartIsEnabled = useTimerStore((state) => state.setStartIsEnabled);

  const history = useUserStore((state) => state.history);
  const setHistory = useUserStore((state) => state.setHistory);

  const firstRenderAfterStart = useRef(true);

  const [fadeOutIndex, setFadeOutIndex] = useState(-1);
  const [fadeInIndexStart, setFadeInIndexStart] = useState(-1);
  const [fadeInIndexArm, setFadeInIndexArm] = useState(-1);

  const handleRowClick = (index: number) => {
    setThisSequence(history[index].sequence);
    setStartIsEnabled(true);
  };

  function moveArrayRow(arr: historyRowObject[], fromIndex: number, toIndex: number) {
    const elementToMove = arr.splice(fromIndex, 1)[0];
    arr.splice(toIndex, 0, elementToMove);
    return arr;
  }

  const [splitIndex, setSplitIndex] = useState(() => {
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

    return 0;
  });

  const handlePinClick = (index: number) => {
    let newHistory = [...history];

    newHistory[index].isPinned = !newHistory[index].isPinned;

    let newSplitIndex: number = -1;
    let newFadeoutIndex: number = -1;
    let newFadeinIndex: number = -1;

    let finalSplitIndex: number = -1;

    if (newHistory[index].isPinned) {
      let prevPinExists = false;

      for (let i = 0; i < newHistory.length; i++) {
        if (newHistory[i].isPinned && i !== index) {
          prevPinExists = true;
        }

        if ((prevPinExists && !newHistory[i].isPinned) || (prevPinExists && i === index)) {
          newHistory = moveArrayRow(newHistory, index, i);
          newSplitIndex = i + 1;
          newFadeinIndex = i;
          break;
        }
      }
      if (!prevPinExists) {
        newHistory = moveArrayRow(newHistory, index, 0);
        newSplitIndex = 0;
      }
    } else {
      newFadeoutIndex = index;
      newHistory.splice(index, 1);
      newSplitIndex = splitIndex - 1;
    }

    newFadeoutIndex = index;

    newHistory[index].isPinned = !newHistory[index].isPinned;
    newHistory[index].isPinned = !newHistory[index].isPinned;

    finalSplitIndex = newSplitIndex;

    if (newHistory[0] && newSplitIndex === -1) {
      if (newHistory[0].isPinned) {
        finalSplitIndex = newHistory.length;
      } else {
        finalSplitIndex = 0;
      }
    }
    if (newFadeoutIndex !== -1) {
      setFadeOutIndex(newFadeoutIndex);
    }

    setTimeout(() => {
      setHistory(newHistory);
      setSplitIndex(finalSplitIndex);
      setFadeOutIndex(-1);
      setFadeInIndexArm(newFadeinIndex);

      setTimeout(() => {
        setFadeInIndexStart(newFadeinIndex);
      }, 100);
    }, 250);
  };

  // Runs once when start is clicked, adds that sequence to History
  if (thisStep === 0 && firstRenderAfterStart.current) {
    // console.log("first function");
    // firstRenderAfterStart.current = false;
    // const newHistory = [...history];
    // const historyRowObject = {
    //   isPinned: false,
    //   sequence: thisSequence,
    // };
    // if (newHistory.length > 7) {
    //   const attemptSplice = (pinIndex: number) => {
    //     if (!newHistory[pinIndex].isPinned) {
    //       newHistory.splice(pinIndex, 1);
    //       return;
    //     } else {
    //       attemptSplice(pinAttemptIndex++);
    //     }
    //   };
    //   let pinAttemptIndex = 0;
    //   attemptSplice(pinAttemptIndex);
    // }
    // newHistory.splice(splitIndex, 0, historyRowObject);
    // setHistory(newHistory);
  }

  useEffect(() => {
    if (thisStep === 0 && firstRenderAfterStart.current) {
      console.log("first function");
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
      newHistory.splice(splitIndex, 0, historyRowObject);
      setHistory(newHistory);
    }

    if (thisStep === -1 && !firstRenderAfterStart.current) {
      firstRenderAfterStart.current = true;
    }

    return () => {};
  }, [history, setHistory, splitIndex, thisSequence, thisStep]);
  // i got bullied into this!!

  return (
    <div className="absolute -top-full left-0 flex h-full w-full flex-col bg-gray-200 pt-6 pb-18 text-white dark:bg-gray-800">
      <div className="mx-auto mb-auto flex w-full flex-1 flex-col [&>*]:flex-1">
        {history.map((historyRow, index) => (
          <div
            key={index}
            className={`relative ${!historyRow.isPinned ? "mb-3 max-h-1/13" : "mb-4 max-h-1/9"} ${fadeOutIndex === index && "scale-0 opacity-0 transition-all duration-200"} ${fadeInIndexArm === index && "scale-0 opacity-0"} ${fadeInIndexStart === index && "scale-100 opacity-100 transition-all duration-150"} ${index === splitIndex && "mt-4"}`}
          >
            <div
              className={`relative flex h-full flex-col px-14 ${index === splitIndex && "animate-pulse-fast [&>*]"}`}
            >
              <div
                className={`relative flex h-full ${!historyRow.isPinned && "px-8 text-white opacity-100 brightness-80"} ${index === splitIndex && "brightness-100"} `}
              >
                <Map
                  onClick={() => {
                    handleRowClick(index);
                    onToggleRowClick();
                  }}
                  isHistoryMap={true}
                  isPinnedMap={historyRow.isPinned}
                  historySequence={historyRow.sequence}
                />
                <div className="flex items-center">
                  <Pin isPinned={historyRow.isPinned} onClick={() => handlePinClick(index)} />
                </div>
              </div>
            </div>
            <div
              className={`${index !== splitIndex - 1 && "hidden"} absolute right-0 left-0 mx-auto mt-[.9rem] h-1 w-full border-t-[.5rem] border-dotted border-black dark:border-white`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
