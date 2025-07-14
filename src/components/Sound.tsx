import { forwardRef, useImperativeHandle, useEffect, useRef } from "react";
import beepFile from "../assets/beep_01.wav";

const Sound = forwardRef((_props, ref) => {
  const beepAudio = useRef<HTMLAudioElement | null>(null);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (beepAudio.current) {
        beepAudio.current.play();
      }
    },
  }));

  useEffect(() => {
    beepAudio.current = new Audio(beepFile);
  }, []);

  return <></>;
});

export default Sound;
