type inputProps = {
  isPinned: boolean;
  onClick: React.MouseEventHandler<HTMLElement>;
};

function Pin({ onClick, isPinned }: inputProps) {
  return (
    <div style={{ opacity: isPinned ? 1 : 0.4 }} onClick={onClick} className="cursor-pointer pt-5 pl-2 select-none">
      📌
    </div>
  );
}

export default Pin;
