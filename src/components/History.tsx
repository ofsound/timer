import Map from "../components/Map.tsx";
import Pin from "../components/Pin.tsx";

interface historyRowObject {
  isPinned: boolean;
  sequenceArray: number[];
}

type inputProps = {
  historyArray: historyRowObject[];
  updateHistoryArray: (a: historyRowObject[]) => void;
  newSequenceCreated: (a: number[], b: boolean) => void;
  isEnabled: boolean;
};

function History({ historyArray, updateHistoryArray, newSequenceCreated, isEnabled }: inputProps) {
  const handleRowClick = (index: number) => {
    newSequenceCreated(historyArray[index].sequenceArray, true);
  };

  const handlePinClick = (index: number) => {
    const tempHistoryArray = [...historyArray];
    tempHistoryArray[index].isPinned = !tempHistoryArray[index].isPinned;
    updateHistoryArray(tempHistoryArray);
  };

  return (
    <div
      className={`${!isEnabled && "opacity-20 blur-[3px] grayscale"} mx-auto mt-2 mb-auto flex aspect-5/3 max-w-3/4 flex-col`}
    >
      {historyArray.map((historyRow, index) => (
        <div key={index} className="relative flex grow-1">
          <Map
            onClick={() => handleRowClick(index)}
            sequenceArray={historyRow.sequenceArray}
            isHistoryMap={true}
            thisStep={0}
          />
          <Pin isPinned={historyArray[index].isPinned} onClick={() => handlePinClick(index)} />
        </div>
      ))}
    </div>
  );
}

export default History;
