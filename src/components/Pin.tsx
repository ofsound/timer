type inputProps = {
  isPinned: boolean;
  onClick: React.MouseEventHandler<HTMLElement>;
};

function Pin({ onClick, isPinned }: inputProps) {
  return (
    <div onClick={onClick} className={`${!isPinned && "grayscale"} cursor-pointer px-2 pt-4 duration-200 select-none`}>
      📌
    </div>
  );
}

export default Pin;
