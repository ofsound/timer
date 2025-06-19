import { useState } from "react";
import SetComponent from "./SetComponent.tsx";

import beepFile from "../assets/beep_01.wav";

type inputProps = {
  currentArray: number[];
};

function TimelineComponent({ currentArray }: inputProps) {
  console.log("Timeline Rendered");

  const defaultPlayingArray = new Array(currentArray.length).fill(false);
  defaultPlayingArray[0] = false; // auto start the first one

  const [playingArray, setPlayingArray] = useState<boolean[]>(defaultPlayingArray);

  const handleSetComplete = () => {
    const updatedArray: boolean[] = [...playingArray];

    for (let i = 0; i < updatedArray.length; i++) {
      if (updatedArray[i] === false) {
        updatedArray[i] = true;
        break;
      }
    }
    setPlayingArray(updatedArray);
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
