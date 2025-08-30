import { forwardRef, useImperativeHandle, useEffect, useRef } from "react";

import { useTimerStore } from "../store.ts";

import beepFile from "../assets/beep_01.wav";
import tremFile from "../assets/trem_01.mp3";

const Sound = forwardRef((_props, ref) => {
  const soundEffectIndex = useTimerStore((state) => state.soundEffectIndex);

  const beepAudio = useRef<HTMLAudioElement | null>(null);
  const tremAudio = useRef<HTMLAudioElement | null>(null);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (soundEffectIndex == 1) {
        if (beepAudio.current) {
          beepAudio.current.play();
        }
      } else {
        if (tremAudio.current) {
          tremAudio.current.play();
        }
      }
    },
  }));

  useEffect(() => {
    beepAudio.current = new Audio(beepFile);
    tremAudio.current = new Audio(tremFile);
  }, []);

  return <></>;
});

export default Sound;
