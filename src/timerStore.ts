import { create } from 'zustand';
// import { devtools } from 'zustand/middleware';

type TimerStore = {
  thisStep: number;
  setThisStep: (thisStep: number) => void;

  thisRatio: number;
  setThisRatio: (thisRatio: number) => void;

  thisSequence: number[],
  setThisSequence: (thisSequence: number[]) => void;

  isAlternating: boolean,
  setIsAlternating: (IsAlternating: boolean) => void;

  startIsEnabled: boolean,
  setStartIsEnabled: (startIsEnabled: boolean) => void

  runningIsPaused: boolean,
  setRunningIsPaused: (runningIsPaused: boolean) => void
}

export const useTimerStore = create<TimerStore>()(
  // devtools(
  (set) => ({
    thisStep: -1,
    setThisStep: (newValue: number) => {
      set({ thisStep: newValue })
    },
    thisRatio: 0,
    setThisRatio: (newValue: number) => {
      set({ thisRatio: newValue })
    },
    thisSequence: [],
    setThisSequence: (newValue: number[]) => {
      set({ thisSequence: newValue })
    },
    isAlternating: true,
    setIsAlternating: (newValue: boolean) => {
      set({ isAlternating: newValue })
    },
    startIsEnabled: false,
    setStartIsEnabled: (newValue: boolean) => {
      set({ startIsEnabled: newValue })
    },
    runningIsPaused: false,
    setRunningIsPaused: (newValue: boolean) => {
      set({ runningIsPaused: newValue })
    },
  })
  // )
);
