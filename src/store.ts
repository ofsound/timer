import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type TimerStore = {
  thisStep: number;
  setThisStep: (thisStep: number) => void;

  thisRatio: number;
  setThisRatio: (thisRatio: number) => void;

  thisSequence: number[],
  setThisSequence: (thisSequence: number[]) => void;
}

export const useTimerStore = create<TimerStore>()(
  devtools(
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
      }
    })));

