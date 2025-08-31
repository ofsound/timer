import type { ChangeEvent } from "react";

import { useTimerStore } from "../store.ts";

function Settings() {
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

  return (
    <div className="absolute top-0 left-0 h-full w-full bg-gray-900 px-14 py-12 text-white">
      <div className="mb-18 text-center text-2xl">Settings</div>
      <div className="flex flex-col gap-12">
        <div className="flex justify-center">
          <div className="text-md mt-7 pr-4 text-right">Count In Time:</div>
          <input
            id="countInTime"
            type="number"
            className="pointer-events-none text-right text-3xl"
            value={countInTime}
            min="1"
            max="99"
            step="1"
            onChange={handleChange}
          />
          <div className="relative top-[18px] -left-3 w-4 text-3xl">s</div>
          <div className="flex flex-col gap-3">
            <button
              className="block h-8 w-8 rounded-sm border-1 border-gray-300 text-2xl"
              onClick={() => setCountInTime(countInTime + 1)}
            >
              <div className="relative -top-1">+</div>
            </button>
            <button
              className="block h-8 w-8 rounded-sm border-1 border-gray-300 text-2xl"
              onClick={() => setCountInTime(countInTime - 1)}
            >
              <div className="relative -top-1">-</div>
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="text-md mt-7 pr-4 text-right">Sound Effect:</div>
          <input
            id="soundEffectIndex"
            type="number"
            className="pointer-events-none text-right text-3xl"
            value={soundEffectIndex}
            min="1"
            max="10"
            step="1"
            onChange={handleChange}
          />
          <div className="relative top-[18px] -left-3 w-4 text-3xl"></div>
          <div className="flex flex-col gap-3">
            <button
              className="block h-8 w-8 rounded-sm border-1 border-gray-300 text-2xl"
              onClick={() => setSoundEffectIndex(soundEffectIndex + 1)}
            >
              <div className="relative -top-1">+</div>
            </button>
            <button
              className="block h-8 w-8 rounded-sm border-1 border-gray-300 text-2xl"
              onClick={() => setSoundEffectIndex(soundEffectIndex - 1)}
            >
              <div className="relative -top-1">-</div>
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="text-md mt-7 pr-4 text-right">Color Theme:</div>
          <input
            id="colorThemeIndex"
            type="number"
            className="pointer-events-none text-right text-3xl"
            value={colorThemeIndex}
            min="1"
            max="10"
            step="1"
            onChange={handleChange}
          />
          <div className="relative top-[18px] -left-3 w-4 text-3xl"></div>
          <div className="flex flex-col gap-3">
            <button
              className="block h-8 w-8 rounded-sm border-1 border-gray-300 text-2xl"
              onClick={() => setColorThemeIndex(colorThemeIndex + 1)}
            >
              <div className="relative -top-1">+</div>
            </button>
            <button
              className="block h-8 w-8 rounded-sm border-1 border-gray-300 text-2xl"
              onClick={() => setColorThemeIndex(colorThemeIndex - 1)}
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
