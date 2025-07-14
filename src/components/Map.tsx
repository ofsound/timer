type inputProps = {
  currentArray: number[];
  thisRatio: number;
  thisStep: number;
};

function Map({ currentArray, thisRatio, thisStep }: inputProps) {
  const mapElement = document.getElementById("map") as HTMLElement;

  if (mapElement) {
    [...mapElement.children].forEach((childElement) => {
      childElement.classList.remove("animate-pulse");
    });

    const activeChild = mapElement.children[thisStep] as HTMLElement;
    if (activeChild) {
      activeChild.classList.add("animate-pulse");

      const innerChild = activeChild.querySelector("#inner") as HTMLElement;

      if (innerChild) {
        innerChild.style.width = (100 * thisRatio).toString() + "%";
      }
    }
  }

  return (
    <>
      <div
        id="map"
        className="mx-10 mt-6 flex justify-start gap-2 rounded-lg border-dashed border-white p-2 has-[div]:border"
      >
        {currentArray.map((inner, index) => (
          <div
            style={{ width: `${inner * 4}px` }}
            key={index}
            className="relative block h-10 overflow-hidden rounded-lg border border-black bg-gray-100 text-center font-bold text-black even:bg-gray-500"
          >
            <div id="inner" className="absolute h-full bg-blue-600 bg-gradient-to-r from-blue-600 to-blue-400"></div>
            <div className="absolute h-full w-full pt-2">{inner}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Map;
