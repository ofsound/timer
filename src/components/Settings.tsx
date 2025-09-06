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
    <div className="absolute top-0 left-0 h-full w-full bg-gray-900 px-14 py-12 text-white">
      <div className="mb-13 text-center text-2xl">Settings</div>
      <div className="flex flex-col gap-12">
        <div className="flex">
          <div className="text-md mt-9 w-32 pr-4 text-right">Count In Time:</div>
          <input
            id="countInTime"
            type="text"
            className="pointer-events-none w-9 text-right text-3xl tabular-nums"
            value={countInTime}
            onChange={handleChange}
          />

          <div className="ml-8 flex flex-col gap-3">
            <button
              className="block h-10 w-10 rounded-sm border-1 border-gray-300 text-2xl"
              onClick={() => trySetCountInTime(countInTime + 1)}
            >
              <div className="relative -top-1">+</div>
            </button>
            <button
              className="block h-10 w-10 rounded-sm border-1 border-gray-300 text-2xl"
              onClick={() => trySetCountInTime(countInTime - 1)}
            >
              <div className="relative -top-1">-</div>
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="text-md mt-9 w-32 pr-4 text-right">Sound Effect:</div>
          <input
            id="soundEffectIndex"
            type="text"
            className="pointer-events-none w-9 text-right text-3xl tabular-nums"
            value={soundEffectIndex}
            onChange={handleChange}
          />
          <div className="relative top-[18px] -left-3 text-3xl"></div>
          <div className="ml-8 flex flex-col gap-3">
            <button
              className="block h-10 w-10 rounded-sm border-1 border-gray-300 text-2xl"
              onClick={() => trySetSoundEffectIndex(soundEffectIndex + 1)}
            >
              <div className="relative -top-1">+</div>
            </button>
            <button
              className="block h-10 w-10 rounded-sm border-1 border-gray-300 text-2xl"
              onClick={() => trySetSoundEffectIndex(soundEffectIndex - 1)}
            >
              <div className="relative -top-1">-</div>
            </button>
          </div>
        </div>
        <div className="flex">
          <div className="text-md mt-9 w-32 pr-4 text-right">Color Theme:</div>
          <input
            id="colorThemeIndex"
            type="text"
            className="pointer-events-none w-9 text-right text-3xl tabular-nums"
            value={colorThemeIndex}
            onChange={handleChange}
          />
          <div className="relative top-[18px] -left-3 text-3xl"></div>
          <div className="ml-8 flex flex-col gap-3">
            <button
              className="block h-10 w-10 rounded-sm border-1 border-gray-300 text-2xl"
              onClick={() => trySetColorThemeIndex(colorThemeIndex + 1)}
            >
              <div className="relative -top-1">+</div>
            </button>
            <button
              className="block h-10 w-10 rounded-sm border-1 border-gray-300 text-2xl"
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
