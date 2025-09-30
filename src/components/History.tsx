import { useRef, useEffect } from "react";

import Map from "../components/Map.tsx";

import { useTimerStore } from "../timerStore.ts";
import { useUserStore } from "../userStore.ts";

type inputProps = {
  onToggleRowClick: () => void;
};

function History({ onToggleRowClick }: inputProps) {
  const thisSequence = useTimerStore((state) => state.thisSequence);
  const setThisSequence = useTimerStore((state) => state.setThisSequence);

  const thisStep = useTimerStore((state) => state.thisStep);
  const setStartIsEnabled = useTimerStore((state) => state.setStartIsEnabled);

  const saved = useUserStore((state) => state.saved);
  const setSaved = useUserStore((state) => state.setSaved);

  const recent = useUserStore((state) => state.recent);
  const setRecent = useUserStore((state) => state.setRecent);

  const isAlternating = useTimerStore((state) => state.isAlternating);

  const firstRenderAfterStart = useRef(true);

  const handleRecentRowClick = (index: number) => {
    setThisSequence(recent[index].sequence);
    setStartIsEnabled(true);
  };

  const handleSavedRowClick = (index: number) => {
    setThisSequence(saved[index].sequence);
    setStartIsEnabled(true);
  };

  const handleRecentButtonClick = (index: number) => {
    const newSaved = [...saved];

    if (newSaved.length !== 5) {
      newSaved.push(recent[index]);
      setSaved(newSaved);
    }
  };

  const handleSavedButtonClick = (index: number) => {
    const newSaved = [...saved];

    newSaved.splice(index, 1);
    setSaved(newSaved);
  };

  useEffect(() => {
    if (thisStep === 0 && firstRenderAfterStart.current) {
      firstRenderAfterStart.current = false;
      const newRecent = [...recent];
      const recentRowObject = {
        isAlternating: isAlternating,
        sequence: thisSequence,
      };

      if (newRecent.length === 5) {
        newRecent.shift();
      }

      newRecent.push(recentRowObject);
      setRecent(newRecent);
    }

    if (thisStep === -1 && !firstRenderAfterStart.current) {
      firstRenderAfterStart.current = true;
    }

    return () => {};
  }, [recent, setRecent, isAlternating, thisSequence, thisStep]);
  // i got bullied into this!!

  return (
    <div className="absolute -top-full left-0 flex h-full w-full flex-col bg-gray-200 text-white dark:bg-gray-800">
      <div className="mx-auto mb-auto flex w-full flex-1 flex-col gap-2 bg-blue-800 py-5 [&>*]:max-h-12">
        {saved.map((savedRow, index) => (
          <div key={index} className={`relative flex h-full flex-col px-12`}>
            <div className={`relative flex h-full`}>
              <Map
                onClick={() => {
                  handleSavedRowClick(index);
                  onToggleRowClick();
                }}
                isHistoryMap={true}
                isAlternatingMap={savedRow.isAlternating}
                historySequence={savedRow.sequence}
              />
              <div className="flex items-center">
                <button
                  className="ml-4 block h-8 w-8 rounded-sm border-1 border-dotted border-gray-900 bg-gray-100 text-xl font-bold text-black shadow-md"
                  onClick={() => handleSavedButtonClick(index)}
                >
                  <div className="relative -top-[1px]">-</div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-blue-800 px-2 pb-1 text-sm font-bold tracking-wide">
        Saved <span className="text-xs">△</span>
      </div>
      <div className="bg-blue-900 px-2 pt-1 text-right text-sm font-bold tracking-wide">
        <span className="text-xs">▽</span> Recent
      </div>
      <div className="mx-auto mb-auto flex w-full flex-1 flex-col-reverse justify-end gap-2 bg-blue-900 py-5 [&>*]:max-h-12">
        {recent.map((recentRow, index) => (
          <div key={index} className={`last:animate-pulse-fast flex h-full flex-col px-12`}>
            <div className={`relative flex h-full`}>
              <Map
                onClick={() => {
                  handleRecentRowClick(index);
                  onToggleRowClick();
                }}
                isHistoryMap={true}
                isAlternatingMap={recentRow.isAlternating}
                historySequence={recentRow.sequence}
              />
              <div className="flex items-center">
                <button
                  className="ml-4 block h-8 w-8 rounded-sm border-1 border-dotted border-gray-900 bg-gray-100 text-xl font-bold text-black shadow-md"
                  onClick={() => handleRecentButtonClick(index)}
                >
                  <div className="relative -top-[1px]">+</div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
