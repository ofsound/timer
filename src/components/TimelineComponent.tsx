import { useState } from "react";
import SetComponent from "./SetComponent.tsx";

type inputProps = {
  currentArray: number[];
};

function TimelineComponent({ currentArray }: inputProps) {
  const defaultPlayingArray = new Array(currentArray.length).fill(false);
  defaultPlayingArray[0] = true;

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
