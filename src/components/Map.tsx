type inputProps = {
  sequenceArray: number[];
  thisStep: number;
  thisRatio: number;
  historyMap?: boolean;
};

function Map({ sequenceArray, thisStep, thisRatio, historyMap }: inputProps) {
  const mapElement = document.getElementById("map") as HTMLElement;

  if (mapElement) {
    [...mapElement.children].forEach((childElement) => {
      childElement.classList.remove("animate-pulse");
    });

    if (thisStep == 0) {
      mapElement.classList.add("animate-pulse");
    } else {
      mapElement.classList.remove("animate-pulse");
    }

    const activeSegment = mapElement.children[thisStep] as HTMLElement;
    if (activeSegment) {
      activeSegment.classList.add("animate-pulse");

      const innerSegment = activeSegment.querySelector("#inner") as HTMLElement;

      if (innerSegment) {
        innerSegment.style.width = (100 * thisRatio).toString() + "%";
      }
    }
  }

  return (
    <div
      id="map"
      className="mt-6 flex justify-start gap-2 rounded-lg border-dashed border-gray-300 p-2 has-[div]:border"
    >
      {historyMap && <p>just a link</p>}
      {sequenceArray.map((inner, index) => (
        <div
          style={{ width: `${inner * 5}px` }}
          key={index}
          className="relative block h-10 overflow-hidden rounded-lg border border-black bg-gray-700 text-center font-bold text-black first:hidden even:bg-gray-100"
        >
          <div id="inner" className="absolute h-full bg-blue-600 bg-gradient-to-r from-blue-600 to-blue-400"></div>
          <div className="absolute h-full w-full pt-2">{inner}</div>
        </div>
      ))}
    </div>
  );
}

export default Map;
