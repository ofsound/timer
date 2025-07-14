type inputProps = {
  currentArray: number[];
  thisRatio: number;
  thisStep: number;
};

function Map({ currentArray, thisRatio, thisStep }: inputProps) {
  // let parentElement = ;

  const nthChild = document.getElementById("map")! as HTMLElement;

  if (nthChild) {
    const activeChild = nthChild.children[thisStep] as HTMLElement;

    if (activeChild) {
      activeChild.style.opacity = thisRatio.toString();
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
            className="block rounded-lg border border-black bg-gray-200 py-3 text-center font-bold text-black even:bg-gray-500"
          >
            {inner}
          </div>
        ))}
      </div>
    </>
  );
}

export default Map;
