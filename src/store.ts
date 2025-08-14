import { create } from 'zustand';

type TimerStore = {
  thisStep: number;
  setThisStep: (thisStep: number) => void;
  thisRatio: number;
  setThisRatio: (thisRatio: number) => void;
}

export const useTimerStore = create<TimerStore>(
  (
    (set: (arg0: { thisStep?: number; thisRatio?: number; }) => void) => ({
      thisStep: -1,
      setThisStep: (newValue: number) => {
        set({ thisStep: newValue })
      },
      thisRatio: -1,
      setThisRatio: (newValue: number) => {
        set({ thisRatio: newValue })
      }

    })));

