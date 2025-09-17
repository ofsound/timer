import { useTimerStore } from "../timerStore.ts";

function AppTools() {
  const thisStep: number = useTimerStore((state) => state.thisStep);
  const thisRatio: number = useTimerStore((state) => state.thisRatio);
  const thisSequence: number[] = useTimerStore((state) => state.thisSequence);

  return (
    <div className="mx-auto mb-8 hidden max-w-[375px] bg-black p-4 font-mono text-xs text-white">
      <div>
        {"thisSequence: ".padStart(14, "\xA0")} [{thisSequence.join(", ")}]
      </div>
      <div>
        {"thisStep: ".padStart(14, "\xA0")} {thisStep}
      </div>
      <div>
        {"thisRatio: ".padStart(14, "\xA0")} {thisRatio.toFixed(2)}
      </div>
    </div>
  );
}
export default AppTools;
