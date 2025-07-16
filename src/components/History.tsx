import Map from "../components/Map.tsx";

type inputProps = {
  historyArray: Array<Array<number>>;
  newSequenceCreated: (a: number[]) => void;
};

function History({ historyArray, newSequenceCreated }: inputProps) {
  const handleClick = (index: number) => {
    newSequenceCreated(historyArray[index]);
  };

  return (
    <div className="">
      {historyArray.map((innerArray, index) => (
        <button className="block" onClick={() => handleClick(index)}>
          <Map sequenceArray={innerArray} isHistoryMap={true} thisStep={0} thisRatio={1} />
        </button>
      ))}
    </div>
  );
}

export default History;
