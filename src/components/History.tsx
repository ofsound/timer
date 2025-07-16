import Map from "../components/Map.tsx";

function History() {
  return (
    <div className="bg-amber-900 p-2">
      <a href="#">
        <Map sequenceArray={[0, 20, 3, 20, 3, 5]} historyMap={true} thisStep={0} thisRatio={1} />
      </a>
      <a href="#">
        <Map sequenceArray={[30, 2, 3, 2, 3]} historyMap={true} thisStep={0} thisRatio={1} />
      </a>
      <a href="#">
        <Map sequenceArray={[0, 2, 30, 2, 30]} historyMap={true} thisStep={0} thisRatio={1} />
      </a>
      <a href="#">
        <Map sequenceArray={[0, 22, 3]} historyMap={true} thisStep={0} thisRatio={1} />
      </a>
      <a href="#">
        <Map sequenceArray={[0, 2, 30]} historyMap={true} thisStep={0} thisRatio={1} />
      </a>
    </div>
  );
}

export default History;
