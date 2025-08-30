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
      <div className="mb-18 text-center text-xl">Settings</div>
      <div className="flex flex-col gap-12">
        <div className="flex justify-center">
          <div className="text-md pr-8 text-right italic">Count In Time</div>
          <input
            id="countInTime"
            type="number"
            className="block rounded-md border-gray-300 text-3xl focus:border-indigo-500 focus:ring-indigo-500"
            value={countInTime}
            min="1"
            max="9"
            step="1"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center">
          <div className="text-md pr-8 text-right italic">Sound Effect</div>
          <input
            id="soundEffectIndex"
            type="number"
            className="block rounded-md border-gray-300 text-3xl focus:border-indigo-500 focus:ring-indigo-500"
            value={soundEffectIndex}
            min="1"
            max="5"
            step="1"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center">
          <div className="text-md pr-8 text-right italic">Color Theme</div>
          <input
            id="colorThemeIndex"
            type="number"
            className="block rounded-md border-gray-300 text-3xl focus:border-indigo-500 focus:ring-indigo-500"
            value={colorThemeIndex}
            min="1"
            max="2"
            step="1"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
