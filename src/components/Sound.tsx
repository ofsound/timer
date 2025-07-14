import { useEffect, useRef } from "react";
import beepFile from "../assets/beep_01.wav";

function Sound() {
  const beepAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    beepAudio.current = new Audio(beepFile);
    beepAudio.current.play();
  }, []);

  return <></>;
}

export default Sound;
