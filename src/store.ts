import { create } from 'zustand';

type TimerStore = {
  thisStep: number;
  setThisStep: (thisStep: number) => void;
  thisRatio: number;
  setThisRatio: (thisRatio: number) => void;
  thisSequence: number[],
  setThisSequence: (thisSequence: number[]) => void;
}

export const useTimerStore = create<TimerStore>(
  (
    (set: (arg0: { thisStep?: number; thisRatio?: number; thisSequence?: number[] }) => void) => ({
      thisStep: -1,
      setThisStep: (newValue: number) => {
        set({ thisStep: newValue })
      },
      thisRatio: -1,
      setThisRatio: (newValue: number) => {
        set({ thisRatio: newValue })
      },
      thisSequence: [],
      setThisSequence: (newValue: number[]) => {
        set({ thisSequence: newValue })
      }
    })));

