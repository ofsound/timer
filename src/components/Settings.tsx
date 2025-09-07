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
    if (newValue >= 0 && newValue <= 30) {
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
    <div className="absolute top-full left-0 h-full w-full bg-gray-300">
      <button
        onClick={onToggleClick}
        className="mx-auto mt-4 block w-max rounded-md bg-gray-200 px-2 py-1 text-sm font-black opacity-20"
      >
        Timer
      </button>
      <div className="mt-8 mb-8 text-center text-xl font-bold tracking-wide">Settings</div>
      <div className="flex flex-col">
        <div className="flex border-t-1 py-3 pr-2 shadow-md">
          <div className="4r-4 mt-2 w-32 text-right font-bold">Count-In Time</div>
          <input
            id="countInTime"
            type="text"
            className="pointer-events-none ml-auto w-12 border-1 pr-3 text-right text-2xl tabular-nums"
            value={countInTime}
            onChange={handleChange}
          />

          <div className="ml-auto flex flex-col gap-3">
            <button
              className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 text-2xl shadow-md"
              onClick={() => trySetCountInTime(countInTime + 1)}
            >
              <div className="relative -top-1">+</div>
            </button>
            <button
              className="te shadow-smxt-2xl border-gray-9lg block h-10 w-10 rounded-sm border-1 border-dotted"
              onClick={() => trySetCountInTime(countInTime - 1)}
            >
              <div className="relative -top-1">-</div>
            </button>
          </div>
        </div>
        <div className="flex border-t-1 py-3 pr-2 shadow-md">
          <div className="text-md mt-2 w-34 pr-4 text-right font-bold">Sound Effect</div>
          <input
            id="soundEffectIndex"
            type="text"
            className="pointer-events-none ml-auto w-12 border-1 pr-3 text-right text-2xl tabular-nums"
            value={soundEffectIndex}
            onChange={handleChange}
          />
          <div className="relative top-[18px] -left-3 text-3xl"></div>
          <div className="ml-auto flex flex-col gap-3">
            <button
              className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 text-2xl shadow-md"
              onClick={() => trySetSoundEffectIndex(soundEffectIndex + 1)}
            >
              <div className="relative -top-1">+</div>
            </button>
            <button
              className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 text-2xl shadow-md"
              onClick={() => trySetSoundEffectIndex(soundEffectIndex - 1)}
            >
              <div className="relative -top-1">-</div>
            </button>
          </div>
        </div>
        <div className="flex border-t-1 border-b-1 py-3 pr-2 shadow-md">
          <div className="text-md mt-2 w-34 pr-4 text-right font-bold">Color Theme</div>
          <input
            id="colorThemeIndex"
            type="text"
            className="pointer-events-none ml-auto w-12 border-1 pr-3 text-right text-2xl tabular-nums"
            value={colorThemeIndex}
            onChange={handleChange}
          />
          <div className="relative top-[18px] -left-3 text-3xl"></div>
          <div className="ml-auto flex flex-col gap-3">
            <button
              className="te shadow-smxt-2xl border-gray-9lg block h-10 w-10 rounded-sm border-1 border-dotted"
              onClick={() => trySetColorThemeIndex(colorThemeIndex + 1)}
            >
              <div className="relative -top-1">+</div>
            </button>
            <button
              className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 text-2xl shadow-md"
              onClick={() => trySetColorThemeIndex(colorThemeIndex - 1)}
            >
              <div className="relative -top-1">-</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
