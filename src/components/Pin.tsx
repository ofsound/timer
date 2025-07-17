type inputProps = {
  isPinned: boolean;
  onClick: React.MouseEventHandler<HTMLElement>;
};

function Pin({ onClick, isPinned }: inputProps) {
  return (
    <div
      style={{ opacity: isPinned ? 1 : 0.3 }}
      onClick={onClick}
      className="cursor-pointer px-2 pt-5 duration-200 select-none"
    >
      📌
    </div>
  );
}

export default Pin;
