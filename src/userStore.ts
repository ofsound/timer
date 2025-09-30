import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

interface historyRowObject {
  sequence: number[];
  isPinned: boolean;
}

interface sequenceRowObject {
  sequence: number[];
  isAlternating: boolean;
}

type UserStore = {
  countInTime: number;
  setCountInTime: (countInTime: number) => void;

  soundEffectIndex: number;
  setSoundEffectIndex: (soundEffectIndex: number) => void;

  colorThemeIndex: number;
  setColorThemeIndex: (colorThemeIndex: number) => void;

  buttonValues: number[],
  setButtonValues: (buttonValues: number[]) => void;

  history: historyRowObject[],
  setHistory: (history: historyRowObject[]) => void;

  recent: sequenceRowObject[],
  setRecent: (history: sequenceRowObject[]) => void;

  saved: sequenceRowObject[],
  setSaved: (saved: sequenceRowObject[]) => void;


}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      countInTime: 5,
      setCountInTime: (newValue: number) => {
        set({ countInTime: newValue })
      },
      soundEffectIndex: 1,
      setSoundEffectIndex: (newValue: number) => {
        set({ soundEffectIndex: newValue })
      },
      colorThemeIndex: 1,
      setColorThemeIndex: (newValue: number) => {
        set({ colorThemeIndex: newValue })
      },
      buttonValues: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 75, 80, 90],
      setButtonValues: (newValue: number[]) => {
        set({ buttonValues: newValue })
      },
      history: [],
      setHistory: (newValue: historyRowObject[]) => {
        set({ history: newValue })
      },
      recent: [],
      setRecent: (newValue: sequenceRowObject[]) => {
        set({ recent: newValue })
      },
      saved: [],
      setSaved: (newValue: sequenceRowObject[]) => {
        set({ saved: newValue })
      }
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
