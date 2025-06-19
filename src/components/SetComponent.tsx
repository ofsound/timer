import Runner from "./Runner.tsx";

type inputProps = {
  durationMilliseconds: number;
  setComplete: () => void;
  trigger: boolean;
};

function SetComponent({ durationMilliseconds, setComplete, trigger }: inputProps) {
  const handleRunnerComplete = () => {
    setComplete();
  };

  return (
    <section
      className="first:-[.6] mt-8 ml-10 flex w-xl flex-1 justify-between rounded-lg bg-gray-200 p-2 pr-5 first:origin-left first:scale-[.6] first:!bg-gray-700 first:opacity-50 odd:bg-gray-500 first:[&>:first-child]:text-white"
      style={{ width: `${durationMilliseconds / 30}px` }}
    >
      {trigger && <Runner durationMilliseconds={durationMilliseconds} runComplete={handleRunnerComplete} />}
    </section>
  );
}

export default SetComponent;
