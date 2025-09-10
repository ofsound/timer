import type { ChangeEvent } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

import { useTimerStore } from "../store.ts";

type inputProps = {
  onSoundChange: (newValue: number) => void;
};

function Settings({ onSoundChange }: inputProps) {
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
    if (newValue >= 1 && newValue <= 3) {
      setSoundEffectIndex(newValue);
      onSoundChange(newValue);
    }
  };

  const trySetColorThemeIndex = (newValue: number) => {
    if (newValue >= 1 && newValue <= 1) {
      setColorThemeIndex(newValue);
    }
  };

  return (
    <div className="absolute top-full left-0 flex h-full w-full flex-col bg-gray-100">
      <div className="mt-5 mb-8 pt-8 text-center text-2xl font-bold tracking-wide">Settings</div>
      <div className="flex flex-1 flex-col [&>*]:flex-1">
        <div className="flex border-t-1 border-gray-400 bg-purple-100 px-11 py-3 grayscale-70 even:bg-purple-200">
          <div className="flex max-h-max self-center-safe">
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
        </div>
        <div className="flex border-t-1 border-gray-400 bg-purple-100 px-11 py-3 grayscale-70 even:bg-purple-200">
          <div className="flex max-h-max self-center-safe">
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
        </div>
        <div className="flex border-t-1 border-b-1 border-gray-400 bg-purple-100 px-11 py-3 grayscale-70 even:bg-purple-200">
          <div className="flex max-h-max self-center-safe">
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
    </div>
  );
}

export default Settings;
