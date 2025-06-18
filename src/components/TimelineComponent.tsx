import { useState, useEffect } from "react";
import SetComponent from "./SetComponent.tsx";

type inputProps = {
  currentArray: number[];
};

function TimelineComponent({ currentArray }: inputProps) {
  const [playingArray, setPlayingArray] = useState<boolean[]>([]);

  let localArray: boolean[] = [];

  const handleSetComplete = () => {
    const updatedArray: boolean[] = localArray.map((item) => item);

    for (let i = 0; i < updatedArray.length; i++) {
      if (updatedArray[i] === false) {
        updatedArray[i] = true;
        break;
      }
    }

    setPlayingArray([...updatedArray]);
  };

  useEffect(() => {
    const defaultPlayingArray = new Array(currentArray.length).fill(false);
    defaultPlayingArray[0] = true;

    localArray = defaultPlayingArray;

    // setPlayingArray(defaultPlayingArray);
    setPlayingArray([...defaultPlayingArray]);

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
