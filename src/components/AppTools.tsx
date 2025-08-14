import { useTimerStore } from "../store.ts";

function AppTools() {
  const thisStep: number = useTimerStore((state) => state.thisStep);
  const thisRatio: number = useTimerStore((state) => state.thisRatio);

  return (
    <div className="mx-auto mb-8 hidden max-w-[375px] bg-gray-900 p-4 text-white">
      <div>thisStep: {thisStep}</div>
      <div>thisRatio: {thisRatio}</div>
    </div>
  );
}
export default AppTools;
