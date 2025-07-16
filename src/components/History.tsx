import Map from "../components/Map.tsx";
import Pin from "../components/Pin.tsx";

interface historyRowObject {
  isPinned: boolean;
  sequenceArray: number[];
}

type inputProps = {
  historyArray: historyRowObject[];
  newSequenceCreated: (a: number[]) => void;
};

function History({ historyArray, newSequenceCreated }: inputProps) {
  const handleRowClick = (index: number) => {
    newSequenceCreated(historyArray[index].sequenceArray);
  };

  const handlePinClick = (index: number) => {
    historyArray[index].isPinned = !historyArray[index].isPinned;
  };

  return (
    <div>
      {historyArray.map((historyRow, index) => (
        <div key={index} className="flex">
          <Map
            onClick={() => handleRowClick(index)}
            sequenceArray={historyRow.sequenceArray}
            isHistoryMap={true}
            thisStep={0}
            thisRatio={1}
          />
          <Pin isPinned={historyArray[index].isPinned} onClick={() => handlePinClick(index)} />
        </div>
      ))}
    </div>
  );
}

export default History;
