import type { ChangeEvent } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

import { useUserStore } from "../userStore.ts";

type inputProps = {
  onSoundChange: (newValue: number) => void;
};

function Settings({ onSoundChange }: inputProps) {
  const countInTime = useUserStore((state) => state.countInTime);
  const setCountInTime = useUserStore((state) => state.setCountInTime);

  const soundEffectIndex = useUserStore((state) => state.soundEffectIndex);
  const setSoundEffectIndex = useUserStore((state) => state.setSoundEffectIndex);

  const colorThemeIndex = useUserStore((state) => state.colorThemeIndex);
  const setColorThemeIndex = useUserStore((state) => state.setColorThemeIndex);

  // maybe not used
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
    if (newValue >= 0 && newValue <= 60) {
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
    if (newValue >= 1 && newValue <= 2) {
      setColorThemeIndex(newValue);

      const html = document.documentElement;
      if (newValue === 1) {
        html.classList.add("dark");
      } else {
        html.classList.remove("dark");
      }
    }
  };

  if (colorThemeIndex === 1) {
    const html = document.documentElement;
    html.classList.add("dark");
  }

  return (
    <div className="absolute top-full left-0 flex h-full w-full flex-col bg-gray-100 dark:bg-gray-800">
      <div className="mt-5 mb-8 pt-8 text-center text-2xl font-bold tracking-wide dark:text-white">Settings</div>
      <div className="flex flex-1 flex-col [&>*]:flex-1">
        <div className="dark:even:bg-pruple-700 flex w-full justify-center border-t-1 border-gray-400 bg-purple-100 px-11 py-3 grayscale-70 even:bg-purple-200 dark:bg-purple-900 dark:text-white">
          <div className="flex max-h-max items-center self-center-safe">
            <div className="text-md w-36 pr-8 text-right">Count-In Time</div>
            <input
              id="countInTime"
              type="text"
              className="pointer-events-none mr-10 ml-auto h-14 w-14 rounded-md border-1 border-dotted bg-gray-100 text-center text-2xl font-bold text-black tabular-nums dark:text-black"
              value={countInTime}
              onChange={handleChange}
            />

            <div className="flex flex-col gap-3 dark:text-black">
              <button
                className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 bg-gray-100 text-2xl font-bold text-black shadow-md"
                onClick={() => trySetCountInTime(countInTime + 1)}
              >
                <div className="relative -top-[2px]">+</div>
              </button>
              <button
                className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 bg-gray-100 text-2xl font-bold text-black shadow-md"
                onClick={() => trySetCountInTime(countInTime - 1)}
              >
                <div className="relative -top-[1px]">–</div>
              </button>
            </div>
          </div>
        </div>
        <div className="dark:even:bg-pruple-700 flex w-full justify-center border-t-1 border-gray-400 bg-purple-100 px-11 py-3 grayscale-70 even:bg-purple-200 dark:bg-purple-900 dark:text-white dark:even:bg-purple-500">
          <div className="flex max-h-max items-center self-center-safe">
            <div className="text-md w-36 pr-8 text-right">Sound Effect</div>
            <input
              id="soundEffectIndex"
              type="text"
              className="pointer-events-none mr-10 ml-auto h-14 w-14 rounded-md border-1 border-dotted bg-gray-100 text-center text-2xl font-bold text-black tabular-nums"
              value={soundEffectIndex}
              onChange={handleChange}
            />
            <div className="relative top-[18px] -left-3 text-3xl"></div>
            <div className="flex flex-col gap-3">
              <button
                className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 bg-gray-100 text-2xl font-bold text-black shadow-md"
                onClick={() => trySetSoundEffectIndex(soundEffectIndex + 1)}
              >
                <div className="relative -top-[2px]">+</div>
              </button>
              <button
                className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 bg-gray-100 text-2xl font-bold text-black shadow-md"
                onClick={() => trySetSoundEffectIndex(soundEffectIndex - 1)}
              >
                <div className="relative -top-[1px]">–</div>
              </button>
            </div>
          </div>
        </div>
        <div className="dark:even:bg-pruple-700 flex w-full justify-center border-t-1 border-gray-400 bg-purple-100 px-11 py-3 grayscale-70 even:bg-purple-200 dark:bg-purple-900 dark:text-white">
          <div className="flex max-h-max items-center self-center-safe">
            <div className="text-md w-36 pr-8 text-right">Color Theme</div>
            <input
              id="colorThemeIndex"
              type="text"
              className="pointer-events-none mr-10 ml-auto h-14 w-14 rounded-md border-1 border-dotted bg-gray-100 text-center text-2xl font-bold text-black tabular-nums"
              value={colorThemeIndex}
              onChange={handleChange}
            />
            <div className="relative top-[18px] -left-3 text-3xl"></div>
            <div className="flex flex-col gap-3">
              <button
                className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 bg-gray-100 text-2xl font-bold text-black shadow-md"
                onClick={() => trySetColorThemeIndex(colorThemeIndex + 1)}
              >
                <div className="relative -top-[2px]">+</div>
              </button>
              <button
                className="block h-10 w-10 rounded-sm border-1 border-dotted border-gray-900 bg-gray-100 text-2xl font-bold text-black shadow-md"
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
