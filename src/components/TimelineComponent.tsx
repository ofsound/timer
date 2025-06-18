import { useState, useEffect } from "react";
import SetComponent from "./SetComponent.tsx";
import beepFile from "../assets/beep_01.wav";

type inputProps = {
  currentArray: number[];
};

function TimelineComponent({ currentArray }: inputProps) {
  const beepAudio = new Audio(beepFile);

  const [playingArray, setPlayingArray] = useState<boolean[]>([]);

  const handleSetComplete = () => {
    beepAudio.play();

    const updatedArray: boolean[] = playingArray.map((item) => item);

    for (let i = 0; i < updatedArray.length; i++) {
      if (updatedArray[i] === false) {
        updatedArray[i] = true;
        break;
      }
    }

    setPlayingArray(updatedArray);
  };

  useEffect(() => {
    const defaultPlayingArray = new Array(currentArray.length).fill(false);
    defaultPlayingArray[0] = true;
    setPlayingArray(defaultPlayingArray);

    return () => {};
  }, [currentArray]);

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
