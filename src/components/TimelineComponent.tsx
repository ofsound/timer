import { useState } from "react";
import SetComponent from "./SetComponent.tsx";

import beepFile from "../assets/beep_01.wav";

type inputProps = {
  currentArray: number[];
};

function TimelineComponent({ currentArray }: inputProps) {
  const defaultPlayingArray = new Array(currentArray.length).fill(false);
  defaultPlayingArray[0] = true; // auto start the first one

  const [playingArray, setPlayingArray] = useState<boolean[]>(defaultPlayingArray);

  const handleSetComplete = () => {
    const afterFirstTrue = 1 + playingArray.findIndex((element) => element === true);

    const returnArray: boolean[] = new Array(currentArray.length).fill(false);

    if (afterFirstTrue < currentArray.length) returnArray[afterFirstTrue] = true;

    setPlayingArray(returnArray);
  };

  const beepAudio = new Audio(beepFile);
  beepAudio.play();

  let keyIndex = 0;

  return (
    <>
      <div>
        {currentArray.map((item) => (
          <SetComponent
            durationMilliseconds={item * 1000}
            key={keyIndex++}
            setComplete={handleSetComplete}
            trigger={playingArray[keyIndex]}
          />
        ))}
      </div>
    </>
  );
}

export default TimelineComponent;
