import { useState, useRef } from "react";
import Segment from "./Segment.tsx";

import beepFile from "../assets/beep_01.wav";

type inputProps = {
  currentArray: number[];
};

function Timeline({ currentArray }: inputProps) {
  const beepAudio = useRef(new Audio(beepFile));

  const defaultPlayingArray = new Array(currentArray.length).fill(false);
  defaultPlayingArray[0] = true;

  let longestDuration = 0;

  for (let i = 0; i < currentArray.length; i++) {
    if (currentArray[i] > longestDuration) {
      longestDuration = currentArray[i];
    }
  }

  const [playingArray, setPlayingArray] = useState<boolean[]>(defaultPlayingArray);

  const handleSetComplete = () => {
    const afterFirstTrue = 1 + playingArray.findIndex((element) => element === true);

    const returnArray: boolean[] = new Array(currentArray.length).fill(false);

    if (afterFirstTrue < currentArray.length) returnArray[afterFirstTrue] = true;

    setPlayingArray(returnArray);

    beepAudio.current.play();
  };

  let keyIndex = 0;

  return (
    <>
      <section className="mx-10 mt-10 flex flex-col">
        {currentArray.map((item) => (
          <Segment
            durationMilliseconds={item * 1000}
            key={keyIndex++}
            widthRatio={item / longestDuration}
            setComplete={handleSetComplete}
            trigger={playingArray[keyIndex]}
          />
        ))}
      </section>
    </>
  );
}

export default Timeline;
