import { forwardRef, useImperativeHandle } from "react";

import { useUserStore } from "../userStore.ts";

import sound1 from "../assets/beep_01.wav";
import sound3 from "../assets/tone2.mp3";
import sound2 from "../assets/tone3.mp3";

const Sound = forwardRef((_props, ref) => {
  const soundEffectIndex = useUserStore((state) => state.soundEffectIndex);

  const audioArray: HTMLAudioElement[] = [];

  audioArray.push(new Audio(sound1));
  audioArray.push(new Audio(sound2));
  audioArray.push(new Audio(sound3));

  useImperativeHandle(ref, () => ({
    play: () => {
      audioArray[soundEffectIndex - 1].play();
    },
    playThis: (newValue: number) => {
      audioArray[newValue - 1].play();
    },
  }));

  return <></>;
});

export default Sound;
