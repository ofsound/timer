import type { ChangeEvent } from "react";

import { useTimerStore } from "../store.ts";

type inputProps = {
  onToggleClick?: React.MouseEventHandler<HTMLElement>;
};

function Settings({ onToggleClick }: inputProps) {
  const countInTime = useTimerStore((state) => state.countInTime);
  const setCountInTime = useTimerStore((state) => state.setCountInTime);

  const soundEffectIndex = useTimerStore((state) => state.soundEffectIndex);
  const setSoundEffectIndex = useTimerStore((state) => state.setSoundEffectIndex);

  const colorThemeIndex = useTimerStore((state) => state.colorThemeIndex);
  const setColorThemeIndex = useTimerStore((state) => state.setColorThemeIndex);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const theInput = event.target as HTMLInputElement;
    const newValue = parseInt(theInput.value, 10);

    switch (theInput.id) {
      case "countInTime":
        setCountInTime(newValue);
        break;
      case "soundEffectIndex":
        setSoundEffectIndex(newValue);
        break;
      case "colorThemeIndex":
        setColorThemeIndex(newValue);
        break;
    }
  };

  const trySetCountInTime = (newValue: number) => {
    if (newValue >= 0 && newValue <= 9) {
      setCountInTime(newValue);
    }
  };

  const trySetSoundEffectIndex = (newValue: number) => {
    if (newValue >= 1 && newValue <= 2) {
      setSoundEffectIndex(newValue);
    }
  };

  const trySetColorThemeIndex = (newValue: number) => {
    if (newValue >= 1 && newValue <= 1) {
      setColorThemeIndex(newValue);
    }
  };

  return (
    <div className="absolute top-full left-0 h-full w-full bg-gray-200">
      <button
        onClick={onToggleClick}
        className="mx-auto mt-4 block w-max rounded-md bg-gray-400 px-2 py-1 text-sm font-bold text-white opacity-40"
      >
        Timer
      </button>
      <div className="mt-5 mb-8 text-center text-2xl font-bold tracking-wide">Settings</div>
      <div className="flex flex-col">
        <div className="flex border-t-1 border-gray-400 bg-purple-100 px-11 py-3 shadow-md grayscale-70 even:bg-purple-200">
          <div className="text-md mt-[34px] w-34 pr-4 text-right">Count-In Time</div>
          <input
            id="countInTime"
            type="text"
            className="pointer-events-none mt-4 mr-10 ml-auto h-14 w-14 rounded-md border-1 border-dotted bg-gray-100 pr-5 text-right text-2xl font-bold tabular-nums"
            value={countInTime}
            onChange={handleChange}
          />

          <div className="flex flex-col gap-3">
            <button
              className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 bg-gray-100 text-2xl font-bold shadow-md"
              onClick={() => trySetCountInTime(countInTime + 1)}
            >
              <div className="relative -top-[2px]">+</div>
            </button>
            <button
              className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 bg-gray-100 text-2xl font-bold shadow-md"
              onClick={() => trySetCountInTime(countInTime - 1)}
            >
              <div className="relative -top-[1px]">–</div>
            </button>
          </div>
        </div>
        <div className="flex border-t-1 border-gray-400 bg-purple-100 px-11 py-3 shadow-md grayscale-70 even:bg-purple-200">
          <div className="text-md mt-[34px] w-34 pr-4 text-right">Sound Effect</div>
          <input
            id="soundEffectIndex"
            type="text"
            className="pointer-events-none mt-4 mr-10 ml-auto h-14 w-14 rounded-md border-1 border-dotted bg-gray-100 pr-5 text-right text-2xl font-bold tabular-nums"
            value={soundEffectIndex}
            onChange={handleChange}
          />
          <div className="relative top-[18px] -left-3 text-3xl"></div>
          <div className="flex flex-col gap-3">
            <button
              className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 bg-gray-100 text-2xl font-bold shadow-md"
              onClick={() => trySetSoundEffectIndex(soundEffectIndex + 1)}
            >
              <div className="relative -top-[2px]">+</div>
            </button>
            <button
              className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 bg-gray-100 text-2xl font-bold shadow-md"
              onClick={() => trySetSoundEffectIndex(soundEffectIndex - 1)}
            >
              <div className="relative -top-[1px]">–</div>
            </button>
          </div>
        </div>
        <div className="flex border-t-1 border-b-1 border-gray-400 bg-purple-100 px-11 py-3 shadow-md grayscale-70 even:bg-purple-200">
          <div className="text-md mt-[34px] w-34 pr-4 text-right">Color Theme</div>
          <input
            id="colorThemeIndex"
            type="text"
            className="pointer-events-none mt-4 mr-10 ml-auto h-14 w-14 rounded-md border-1 border-dotted bg-gray-100 pr-5 text-right text-2xl font-bold tabular-nums"
            value={colorThemeIndex}
            onChange={handleChange}
          />
          <div className="relative top-[18px] -left-3 text-3xl"></div>
          <div className="flex flex-col gap-3">
            <button
              className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 bg-gray-100 text-2xl font-bold shadow-md"
              onClick={() => trySetColorThemeIndex(colorThemeIndex + 1)}
            >
              <div className="relative -top-[2px]">+</div>
            </button>
            <button
              className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 bg-gray-100 text-2xl font-bold shadow-md"
              onClick={() => trySetColorThemeIndex(colorThemeIndex - 1)}
            >
              <div className="relative -top-[1px]">–</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
