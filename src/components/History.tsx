import Map from "../components/Map.tsx";
import Pin from "../components/Pin.tsx";

type inputProps = {
  historyArray: Array<Array<number>>;
  newSequenceCreated: (a: number[]) => void;
};

function History({ historyArray, newSequenceCreated }: inputProps) {
  const handleRowClick = (index: number) => {
    newSequenceCreated(historyArray[index]);
  };

  const handlePinClick = () => {
    alert("togglePin!");
  };

  return (
    <div>
      {historyArray.map((innerArray, index) => (
        <div className="flex">
          <Map
            key={index}
            onClick={() => handleRowClick(index)}
            sequenceArray={innerArray}
            isHistoryMap={true}
            thisStep={0}
            thisRatio={1}
          />
          <Pin onClick={() => handlePinClick()} />
        </div>
      ))}
    </div>
  );
}

export default History;
